import { useCallback, useContext, useEffect, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  useReactFlow,
  Node,
  Controls,
} from "reactflow";

import "reactflow/dist/style.css";
import "./whiteboard.css";
import React from "react";
import NoteContainer from "../Notes/NoteContainer";
import { Note, colorsArray } from "../Notes/Notes";
import { useQuery } from "react-query";
import { editNote, getNotes } from "../../api/noteApi";
import AddNote from "../AddNote";
import ResizableNoteSelected from "./ResizableNoteSelected";
import WhiteboardProvider, {
  WhiteboardContext,
} from "../../context/WhiteboardContext";

const nodeTypes = {
  ResizableNoteSelected,
};

function Flow() {
  const reactFlowInstance = useReactFlow();

  // const [isFetching, setIsFetching] = useState<boolean>(true);
  // const queryClient = useQueryClient();

  const EditNotemutation: any = useContext(WhiteboardContext);

  // const EditNotemutation = useMutation({
  //   mutationFn: editNote,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("notes");
  //   },
  // });

  const { data: notes } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
    enabled: !EditNotemutation.isLoading && !EditNotemutation.isError,
  });

  const onNodeDragStop = (_: any, node: Node) => {
    const noteData = notes[parseInt(node.id) - 1];

    const { x, y } = node.position;
    if (noteData?.x !== x || noteData?.y !== y) {
      // Update note data only if it has changed position
      EditNotemutation.mutate({
        ...noteData,
        x,
        y,
        width: noteData.width,
        height: noteData.height,
      });
    }
  };

  useEffect(() => {
    notes
      ?.sort((a: { id: number }, b: { id: number }) => (a.id > b.id ? 1 : -1))
      ?.filter(({ isDeleted }) => !isDeleted)
      .map((note: Note, idx: number) => {
        const newNode = {
          id: `${note.id}`,
          position: {
            x: note.x || 300 * idx,
            y: note.y || 100,
          },
          type: "ResizableNoteSelected",
          style: {
            width: note.width || "unset",
            height: note.height || "unset",
          },

          data: {
            label: (
              <NoteContainer
                className="note-whiteboard"
                key={idx + 1}
                styles={{ maxHight: "none", display: "unset" }}
                note={{
                  ...note,
                  color: colorsArray[idx % colorsArray.length],
                }}
              />
            ),
          },
        };
        reactFlowInstance.addNodes(newNode);
      });
  }, [notes]);

  return (
    <>
      <ReactFlow
        onNodeDragStop={onNodeDragStop}
        snapGrid={[25, 25]}
        snapToGrid={true}
        defaultNodes={[]}
        nodeTypes={nodeTypes}
      />
      <AddNote
        notesLength={notes?.filter(({ isDeleted }) => !isDeleted)?.length}
      ></AddNote>
      <Controls />
    </>
  );
}

function Whiteboard(props) {
  return (
    <ReactFlowProvider>
      <WhiteboardProvider>
        <Flow {...props} />
      </WhiteboardProvider>
    </ReactFlowProvider>
  );
}

export default Whiteboard;

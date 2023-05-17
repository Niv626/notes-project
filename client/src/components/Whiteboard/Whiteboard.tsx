import { useEffect } from "react";
import ReactFlow, { useReactFlow, Node, Controls } from "reactflow";
import "reactflow/dist/style.css";
import "./whiteboard.css";
import React from "react";
import NoteContainer from "../Notes/NoteContainer";
import { Note, colorsArray } from "../Notes/Notes";
import { useQuery } from "react-query";
import { editNote, getNotes } from "../../api/noteApi";
import AddNote from "../AddNote";
import ResizableNoteSelected from "./ResizableNoteSelected";
import { useNoteMutation } from "../../hooks/useNoteMutation";

const nodeTypes = {
  ResizableNoteSelected,
};

const Whiteboard = () => {
  const reactFlowInstance = useReactFlow();
  const EditNotemutation = useNoteMutation();

  const { data: notes, refetch } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  useEffect(() => {
    refetch();
  }, []);

  const onNodeDragStop = (_: any, node: Node) => {
    const noteData = notes.find((note) => note.id === parseInt(node.id));

    const { x, y } = node.position;
    if (noteData?.x !== x || noteData?.y !== y) {
      // Update note data only if it has changed position
      EditNotemutation.mutate({
        ...noteData,
        x,
        y,
        width: noteData?.width,
        height: noteData?.height,
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
        fitView
        minZoom={0.5}
        maxZoom={2.5}
      />
      <AddNote
        notesLength={notes?.filter(({ isDeleted }) => !isDeleted)?.length}
      ></AddNote>
      <Controls style={{ paddingLeft: "2.8em", boxShadow: "none" }} />
    </>
  );
};
export default Whiteboard;

import React, { useContext } from "react";
import { memo } from "react";
import {
  Handle,
  Position,
  NodeResizer,
  ResizeDragEvent,
  ResizeParams,
} from "reactflow";
import { useMutation, useQueryClient } from "react-query";
import { editNote } from "../../api/noteApi";

const ResizableNodeSelected = ({ data, selected }) => {
  const queryClient = useQueryClient();

  const EditNotemutation = useMutation({
    mutationFn: editNote,
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
    },
  });

  const onResizeEnd = (_: ResizeDragEvent, n: ResizeParams) => {
    const note = data.label.props.note;
    if (note)
      EditNotemutation.mutate({
        ...note,
        width: n.width,
        height: n.height,
        x: n.x,
        y: n.y,
      });
  };

  return (
    <>
      <NodeResizer
        color="black"
        isVisible={selected}
        minWidth={273}
        minHeight={284}
        onResizeEnd={onResizeEnd}
        handleStyle={{ width: 8, height: 8, borderRadius: 6 }}
      />
      <Handle type="target" position={Position.Left} />
      <div style={{ height: "100%" }}>{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default memo(ResizableNodeSelected);

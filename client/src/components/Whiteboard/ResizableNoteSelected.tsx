import React, { useContext } from "react";
import { memo } from "react";
import { Handle, Position, NodeResizer } from "reactflow";
import { WhiteboardContext } from "../../context/WhiteboardContext";

const ResizableNodeSelected = ({ data, selected }) => {
  const mute = useContext(WhiteboardContext);
  console.log("mute", mute);
  return (
    <>
      <NodeResizer
        color="black"
        isVisible={selected}
        minWidth={273}
        minHeight={284}
        // onResizeEnd={mute.mutate({})}
      />
      <Handle type="target" position={Position.Left} />
      <div style={{ height: "100%" }}>{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default memo(ResizableNodeSelected);

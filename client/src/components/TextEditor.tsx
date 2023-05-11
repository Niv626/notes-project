import React, { memo, useEffect, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import "./text-editor.css";

const buttonList = [
  ["undo", "redo"],
  ["font", "fontSize", "formatBlock"],
  ["paragraphStyle", "blockquote"],
  ["bold", "underline", "italic", "strike", "subscript", "superscript"],
  ["fontColor", "hiliteColor", "textStyle"],
  ["removeFormat"],
  // "/", // Line break
  ["outdent", "indent"],
  // ["align", "horizontalRule", "list", "lineHeight"],
  ["table", "link", "image", "video", "audio" /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
  /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
  ["fullScreen", "showBlocks", "codeView"],
  ["preview", "print"],
  // ["save", "template"],
  /** ['dir', 'dir_ltr', 'dir_rtl'] */ // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
];

const TextEditor = (props) => {
  return (
    <SunEditor
      setContents={props?.content}
      autoFocus={false}
      placeholder="Add note"
      onChange={
        props?.handleTextChange
          ? (text) => props?.handleTextChange(text)
          : undefined
      }
      setOptions={{
        buttonList,
      }}
      disable={props?.disable}
      disableToolbar={props?.disableToolbar}
      hideToolbar={props?.hideToolbar}
      defaultValue={props?.defaultValue}
      setDefaultStyle={props?.setDefaultStyle}
    />
  );
};
export default memo(TextEditor);

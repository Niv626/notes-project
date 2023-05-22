import React from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import "./text-editor.css";

const buttonList = [
  ["undo", "redo"],
  ["font", "fontSize", "formatBlock"],
  ["paragraphStyle", "blockquote"],
  ["bold", "underline", "italic", "strike", "subscript", "superscript"],
  ["fontColor", "hiliteColor" /**"textStyle"*/],
  ["removeFormat"],
  // "/", // Line break
  ["outdent", "indent"],
  // ["align", "horizontalRule", "list", "lineHeight"],
  [/** ,'table', link, */ "image", "video", "audio" /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
  /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
  ["fullScreen" /**"showBlocks", , "codeView"*/],
  ["preview", "print"],
  // ["save", "template"],
  /** ['dir', 'dir_ltr', 'dir_rtl'] */ // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
];

const TextEditor = (props) => {
  return (
    <>
      {!props.isNoteContainer ? (
        <SunEditor
          key={props.content}
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
          setDefaultStyle="height:auto; font-family: arial"
        />
      ) : (
        <div
          className="display-note-container"
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      )}
    </>
  );
};
export default TextEditor;

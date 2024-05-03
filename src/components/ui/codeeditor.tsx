"use client";
import React, { useEffect, useRef } from "react";
// import { useCodeMirror } from "@uiw/react-codemirror";
import CodeMirror from "@uiw/react-codemirror";
import { bbedit, bbeditInit } from "@uiw/codemirror-theme-bbedit";
import { tags as t } from "@lezer/highlight";
function CodeEditor({ code = "", setCode }) {
  return (
    <div>
      <CodeMirror
        value={code.trim()}
        height="500px"
        theme={bbeditInit({
          settings: {
            caret: "#c6c6c6",
            fontFamily: "monospace",
          },
          styles: [{ tag: t.comment, color: "#6272a4" }],
        })}
        onChange={(value, viewUpdate) => {
          // console.log("value:", value);
          setCode(value);
        }}
      />
      <div className="mt-10 text-red-500">
        {code.trim() === "" ? "Code editor empty" : null}
      </div>
    </div>
  );
}

export default CodeEditor;

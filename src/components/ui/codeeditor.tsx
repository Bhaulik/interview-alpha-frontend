"use client";
import React, { useEffect, useRef } from "react";
import { useCodeMirror } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import CodeMirror from "@uiw/react-codemirror";

function CodeEditor({ code = "console.log('Code Mirror!!!');" }) {
  return <CodeMirror value={code.trim()} height="500px" />;
}

export default CodeEditor;

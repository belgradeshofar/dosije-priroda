"use client";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface EditorWrapperProps {
  value: string;
  onChange: (content: string) => void;
}

export default function EditorWrapper({ value, onChange }: EditorWrapperProps) {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      theme="snow"
    />
  );
}

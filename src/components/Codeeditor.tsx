import { Editor } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { Skeleton } from "@/components/ui/skeleton";
import { Code2 } from "lucide-react";
import React from "react";
const CodeEditor = ({ language, value, onChange }: any) => {
  const { theme } = useTheme();

  return (
    <Editor
      height="75vh"
      language={language}
      value={value}
      theme={theme === "dark" ? "vs-dark" : "light"}
      onChange={onChange}
      loading={
        <>
          <Skeleton className="w-full h-full" />
          <Code2
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            size={70}
          />
        </>
      }
      options={{
        selectOnLineNumbers: true,
        wordWrap: "on",
      }}
    />
  );
};

export default CodeEditor;

import { useState } from "react";
import CodeEditor from "@/components/Codeeditor";
import { Button } from "@/components/ui/button";
import Markdown from "react-markdown";
import React from "react";
import { toast } from "sonner";
import { z } from "zod";
import { experimental_useObject as useObject } from "ai/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRightIcon, Atom, Code2Icon, Copy, Loader } from "lucide-react";
import { DM_Mono } from "next/font/google";
import ShineBorder from "./magicui/shine-border";
import { useTheme } from "next-themes";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const font = DM_Mono({ subsets: ["latin"], weight: ["400"] });

const Convertor = () => {
  const { object, submit, isLoading, error } = useObject({
    api: "/api/codegen",
    schema: z.object({
      code: z.string(),
      explanation: z.string(),
    }),
  });

  const theme = useTheme();
  const [sourceCode, setSourceCode] = useState("// Write your code here");
  const [translatedCode, setTranslatedCode] = useState<string>("");
  const [sourceLanguage, setSourceLanguage] = useState("javascript");
  const [translatedLanguage, setTranslatedLanguage] = useState("python");

  const prompted = `convert this code from ${sourceLanguage} to ${translatedLanguage} : \n ${sourceCode}`;

  if (error) {
    toast.error("Failed to generate code");
  }

  function copy(text: string) {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  }

  return (
    <div
      className="max-w-screen px-2 min-h-screen w-full md:px-20 my-16"
      id="coder"
    >
      <div className="grid gap-20 grid-cols-1 sm:grid-cols-2 relative">
        <div className="flex flex-col">
          <div className="flex">
            <Select onValueChange={setSourceLanguage} defaultValue="javascript">
              <SelectTrigger className="rounded-e-none border-e-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="ada">Ada</SelectItem>
                <SelectItem value="assembly">Assembly</SelectItem>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="clojure">Clojure</SelectItem>
                <SelectItem value="cobol">COBOL</SelectItem>
                <SelectItem value="coffeescript">CoffeeScript</SelectItem>
                <SelectItem value="delphi">Delphi</SelectItem>
                <SelectItem value="erlang">Erlang</SelectItem>
                <SelectItem value="fsharp">F#</SelectItem>
                <SelectItem value="fortran">Fortran</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="groovy">Groovy</SelectItem>
                <SelectItem value="haskell">Haskell</SelectItem>
                <SelectItem value="julia">Julia</SelectItem>
                <SelectItem value="kotlin">Kotlin</SelectItem>
                <SelectItem value="lisp">Lisp</SelectItem>
                <SelectItem value="lua">Lua</SelectItem>
                <SelectItem value="matlab">MATLAB</SelectItem>
                <SelectItem value="objective-c">Objective-C</SelectItem>
                <SelectItem value="pascal">Pascal</SelectItem>
                <SelectItem value="perl">Perl</SelectItem>
                <SelectItem value="php">PHP</SelectItem>
                <SelectItem value="powershell">PowerShell</SelectItem>
                <SelectItem value="r">R</SelectItem>
                <SelectItem value="ruby">Ruby</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
                <SelectItem value="scala">Scala</SelectItem>
                <SelectItem value="swift">Swift</SelectItem>
                <SelectItem value="tcl">Tcl</SelectItem>
                <SelectItem value="vbnet">VB.NET</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={"outline"}
              className="rounded-s-none"
              size={"icon"}
              onClick={() => copy(sourceCode)}
            >
              <Copy />
            </Button>
          </div>
          <ShineBorder
            className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg p-0.5 bg-background shadow-md hover:shadow-xl transm dark:shadow-none"
            color={theme.theme === "light" ? "black" : ["white", "#c9c9c9"]}
          >
            <div className="rounded-b-lg overflow-hidden w-full">
              <CodeEditor
                language={sourceLanguage}
                value={sourceCode}
                onChange={(value: any) => setSourceCode(value)}
              />
            </div>
          </ShineBorder>
        </div>
        <button
          type="button"
          title="convert"
          onClick={() => {
            submit(prompted);
          }}
          disabled={isLoading}
          className="overflow-hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-36 p-2 h-12 bg-gradient-to-br from-black via-zinc-900 to-zinc-950 border text-white rounded-md text-xl font-semibold cursor-pointer z-10 group disabled:opacity-65 flex items-center justify-center active:scale-95"
        >
          Convert! <ArrowRightIcon className="ml-2 size-6" />
          <span className="absolute w-40 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
          <span className="absolute w-40 h-32 -top-8 -left-2 bg-primary/40 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
          <span className="absolute w-40 h-32 -top-8 -left-2 bg-primary rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
          <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10 flex items-center justify-center text-black">
            {isLoading ? (
              <>
                <Loader className="animate-spin ml-8" />
              </>
            ) : (
              <>
                Code <Code2Icon className="ml-2" />
              </>
            )}
          </span>
        </button>
        <div className="flex flex-col">
          <div className="flex">
            <Select onValueChange={setTranslatedLanguage} defaultValue="python">
              <SelectTrigger className="rounded-e-none border-e-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="ada">Ada</SelectItem>
                <SelectItem value="assembly">Assembly</SelectItem>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="clojure">Clojure</SelectItem>
                <SelectItem value="cobol">COBOL</SelectItem>
                <SelectItem value="coffeescript">CoffeeScript</SelectItem>
                <SelectItem value="delphi">Delphi</SelectItem>
                <SelectItem value="erlang">Erlang</SelectItem>
                <SelectItem value="fsharp">F#</SelectItem>
                <SelectItem value="fortran">Fortran</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="groovy">Groovy</SelectItem>
                <SelectItem value="haskell">Haskell</SelectItem>
                <SelectItem value="julia">Julia</SelectItem>
                <SelectItem value="kotlin">Kotlin</SelectItem>
                <SelectItem value="lisp">Lisp</SelectItem>
                <SelectItem value="lua">Lua</SelectItem>
                <SelectItem value="matlab">MATLAB</SelectItem>
                <SelectItem value="objective-c">Objective-C</SelectItem>
                <SelectItem value="pascal">Pascal</SelectItem>
                <SelectItem value="perl">Perl</SelectItem>
                <SelectItem value="php">PHP</SelectItem>
                <SelectItem value="powershell">PowerShell</SelectItem>
                <SelectItem value="r">R</SelectItem>
                <SelectItem value="ruby">Ruby</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
                <SelectItem value="scala">Scala</SelectItem>
                <SelectItem value="swift">Swift</SelectItem>
                <SelectItem value="tcl">Tcl</SelectItem>
                <SelectItem value="vbnet">VB.NET</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={"outline"}
              className="rounded-s-none"
              size={"icon"}
              onClick={() => copy(object?.code || translatedCode)}
            >
              <Copy />
            </Button>
          </div>
          <ShineBorder
            className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg p-0.5 bg-background shadow-md hover:shadow-xl transm dark:shadow-none"
            color={theme.theme === "light" ? "black" : ["white", "#88f7ab"]}
          >
            <div className="rounded-b-lg w-full overflow-hidden">
              <CodeEditor
                language={translatedLanguage}
                value={object?.code || ""}
                onChange={(value: any) => setTranslatedCode(value)}
              />
            </div>
          </ShineBorder>
        </div>
      </div>
      {object?.explanation && (
        <div className="mt-4 p-2 md:p-10 mx-auto border-2 border-dashed rounded-lg border-s-primary">
          <h1 className="text-2xl py-2 md:text-4xl font-semibold">
            Explanation:{" "}
          </h1>
          <div
            className={
              font.className +
              " text-lg whitespace-pre leading-[1.4rem] text-pretty"
            }
          >
            <Markdown>{object.explanation || "Nothing...."}</Markdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default Convertor;

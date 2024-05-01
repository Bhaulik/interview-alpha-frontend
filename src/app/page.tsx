"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import CodeEditor from "@/components/ui/codeeditor";
import { useEffect, useState } from "react";
import Navbar from "@/components/nav";
import TestCaseDisplay from "@/components/ui/testcases";
import CodeMetrics from "@/components/ui/feedback";
import Link from "next/link";
import { Copy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/ui/copybtn";
import { Loader2 } from "lucide-react";
import HeaderDiv from "@/components/ui/headerdiv";

export default function Home({ question }) {
  const sections = [
    { id: "execution", label: "Execution" },
    { id: "optimization", label: "Optimization" },
    { id: "improvedCode", label: "Improved Code" },
    { id: "recommendations", label: "Recommendations" },
    { id: "conclusion", label: "Conclusion" },
    { id: "errorsWarnings", label: "Errors/Warnings" },
  ];
  const [codeSolution, setCodeSolution] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [array, setArray] = useState([]);
  const [code, setCode] = useState();

  const [introduction, setIntroduction] = useState("");
  const [execution, setExecution] = useState("");
  const [optimization, setOptimization] = useState("");
  const [errorsWarnings, setErrorsWarnings] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [improvedCode, setImprovedCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const metrics = {
    time_complexity: "O(n)",
    space_complexity: "O(n)",
    syntax_errors: null,
    successful_compilation: true,
    code_quality_meter: 8,
  };
  const addItem = (item) => {
    setArray((prevArray) => [...prevArray, item]);
  };

  const runCode = async () => {
    // Dummy API URL, replace with your actual API endpoint
    const response = await fetch("http://127.0.0.1:8000/");
    setIsRunning(true);
    const data = await response.json();
    console.log(data);
    addItem(data.message);
    setCode(data.input);
    setIsLoading(false);
    // Define regex patterns for each section
    const introRegex =
      /(?<=\*\*Introduction:\*\*\s+)([\s\S]*?)(?=\*\*Execution:\*\*)/;
    const executionRegex =
      /(?<=\*\*Execution:\*\*\s+)([\s\S]*?)(?=\*\*Optimization:\*\*)/;
    const optimizationRegex =
      /(?<=\*\*Optimization:\*\*\s+)([\s\S]*?)(?=\*\*Errors and Warnings:\*\*)/;
    const errorsWarningsRegex =
      /(?<=\*\*Errors and Warnings:\*\*\s+)([\s\S]*?)(?=\*\*Conclusion:\*\*)/;
    const conclusionRegex =
      /(?<=\*\*Conclusion:\*\*\s+)([\s\S]*?)(?=\*\*Recommendations:\*\*)/;
    const recommendationsRegex =
      /(?<=\*\*Recommendations:\*\*\s+)([\s\S]*?)(?=\*\*Improved Code:\*\*)/;
    const codeRegex =
      /(?<=\*\*Improved Code:\*\*\s+\`\`\`python\s+)([\s\S]*?)(?=\`\`\`)/;

    // Extract each section
    const introduction = data.message.match(introRegex)[0].trim();
    const execution = data.message.match(executionRegex)[0].trim();
    const optimization = data.message.match(optimizationRegex)[0].trim();
    const errorsWarnings = data.message.match(errorsWarningsRegex)[0].trim();
    const conclusion = data.message.match(conclusionRegex)[0].trim();
    // const detectedLanguage = data.message.match(detectedLanguage)[0].trim();
    const recommendations = data.message.match(recommendationsRegex)[0].trim();
    const improvedCode = data.message.match(codeRegex)[0].trim();

    setIntroduction(introduction);
    setExecution(execution);
    setOptimization(optimization);
    setErrorsWarnings(errorsWarnings);
    setConclusion(conclusion);
    setRecommendations(recommendations);
    setImprovedCode(improvedCode);

    // Output each section
    console.log("Introduction:", introduction);
    console.log("Execution:", execution);
    console.log("Optimization:", optimization);
    console.log("Errors and Warnings:", errorsWarnings);
    console.log("Conclusion:", conclusion);
    console.log("Recommendations:", recommendations);
    console.log("Improved Code:", improvedCode);
    setIsRunning(false);
  };

  return (
    <div className="m-6">
      <HeaderDiv />
      <h1 className="text- flex justify-center m-4 text-orange-600">
        Question:{question}
      </h1>
      <Navbar sections={sections} />
      <div className="mt-20 m grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:gap-8">
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="mb-4 flex items-center justify-between">
            <CopyButton text={code} />
            <h2 className="text-lg font-medium">Code Editor 🤔</h2>

            {isRunning ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button onClick={runCode}>Evaluate</Button>
            )}
          </div>
          <div className="flex justify-end m-2"></div>
          {/* <Textarea
          className="h-[300px] w-full resize-none rounded-md border border-gray-200 bg-gray-50 p-3 text-sm shadow-sm transition-colors focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-gray-600 dark:focus:ring-gray-600"
          placeholder="Enter your code here..."
        /> */}
          <CodeEditor code={code} />
        </div>
        <div
          id="execution"
          className="execution rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950"
        >
          <h2 className="mb-4 text-lg font-medium">Test Cases Output</h2>
          {/* <ScrollArea className="h-[600px] rounded-md border border-gray-200 bg-gray-50 p-3 text-sm shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"> */}
          {/* {execution} */}
          {/* <TestCaseDisplay text={execution} /> */}
          {/* </ScrollArea> */}
        </div>{" "}
        <div
          id="code-metrics"
          className="code-metrics rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950"
        >
          <h2 className="mb-4 text-lg font-medium">Code Metrics 🧮</h2>
          <CodeMetrics metrics={metrics} />
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium">Solution</h2>
            <Button>ReRun 🐉</Button>
          </div>
          {/* <Textarea
            className="h-[300px] w-full resize-none rounded-md border border-gray-200 bg-gray-50 p-3 text-sm shadow-sm transition-colors focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-gray-600 dark:focus:ring-gray-600"
            placeholder="Enter your code here..."
          /> */}
          <ScrollArea className="h-[300px] rounded-md border border-gray-200 bg-gray-50 p-3 text-sm shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
            <pre className="whitespace-pre-wrap break-words">
              <code>{code && code.trim()}</code>
            </pre>
          </ScrollArea>
          <p>Detected Language: </p>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <h2 className="mb-4 text-lg font-medium">
            Improved Code
            {/* {recommendations} */}
          </h2>
          <ScrollArea className="h-[300px] rounded-md border border-gray-200 bg-gray-50 p-3 text-sm shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
            <pre className="whitespace-pre-wrap break-words">
              <code>{improvedCode}</code>
            </pre>
          </ScrollArea>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <h2 className="mb-4 text-lg font-medium">
            Recommendations/Optimizations 🚀
          </h2>
          <ScrollArea className="h-[300px] rounded-md border border-gray-200 bg-gray-50 p-3 text-sm shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
            <pre className="whitespace-pre-wrap break-words">
              <code>{optimization}</code>
            </pre>
            <div>--------------------------</div>
            <pre className="whitespace-pre-wrap break-words">
              <code>{recommendations}</code>
            </pre>
          </ScrollArea>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <h2 className="mb-4 text-lg font-medium">Conclusion</h2>
          <ScrollArea className="h-[300px] rounded-md border border-gray-200 bg-gray-50 p-3 text-sm shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
            <pre className="whitespace-pre-wrap break-words">
              <code>{conclusion}</code>
            </pre>
          </ScrollArea>
        </div>{" "}
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <h2 className="mb-4 text-lg font-medium">Errors/Warnings</h2>
          <ScrollArea className="h-[300px] rounded-md border border-gray-200 bg-gray-50 p-3 text-sm shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
            <pre className="whitespace-pre-wrap break-words">
              <code>{errorsWarnings}</code>
            </pre>
          </ScrollArea>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <h2 className="mb-4 text-lg font-medium">Web Resources</h2>
          <div></div>
        </div>
      </div>
    </div>
  );
}

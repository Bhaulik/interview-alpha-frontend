"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { ScrollArea } from "@/components/ui/scroll-area";
import CodeEditor from "@/components/ui/codeeditor";
import { useEffect, useState } from "react";
import Navbar from "@/components/nav";
import CodeMetrics from "@/components/ui/feedback";
import { CopyButton } from "@/components/ui/copybtn";
import { Loader2 } from "lucide-react";
import HeaderDiv from "@/components/ui/headerdiv";
import { useSearchParams } from "next/navigation";
import FetchYouTubeData from "@/components/ui/web_resources";

function trimQuestion(a) {
  // Find the index of the colon character
  let colonIndex = a.indexOf(":");

  // Extract the substring up to the colon
  let substrUntilColon = a.slice(0, colonIndex);
  return substrUntilColon;
}

function convertElementsToStrings(arr) {
  if (typeof arr === "string" || arr instanceof String) {
    return arr;
  }

  console.log(arr);
  if (Array.isArray(arr)) {
    return arr.map((item) => {
      if (typeof item === "object" && item !== null) {
        // Convert object to string using JSON.stringify for a straightforward representation
        return JSON.stringify(item);
      }
      // Return the item as is if it's already a string or any other type
      return item;
    });
  }
}

export default function Home() {
  const searchParams = useSearchParams();
  const questionFromParams = searchParams.get("q");
  const testCasesFromParams = searchParams.get("test_cases");
  const constraintsFromParams = searchParams.get("constraints");
  const difficultyFromParams = searchParams.get("difficulty");
  const topicsFromParams = searchParams.get("topics");
  console.log("Question from params:", questionFromParams);
  console.log("Question from test Cases:", testCasesFromParams);
  const sections = [
    { id: "codeeditor", label: "Code Editor" },
    { id: "testcasesoutput", label: "Test Cases Output" },
    { id: "codemetrics", label: "Code Metrics" },
    { id: "optimalsolution", label: "Optimal Solution" },
    { id: "codereport", label: "Code Report" },
    { id: "resources", label: "Resources" },
  ];
  const [code, setCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [timeComplexity, setTimeComplexity] = useState("undefined");
  const [spaceComplexity, setSpaceComplexity] = useState("undefined");
  const [errors, setErrors] = useState("");
  const [codeQualityMeter, setCodeQualityMeter] = useState(0);
  const [codeReport, setCodeReport] = useState("");
  const [optimalSolution, setOptimalSolution] = useState("");
  const [testCaseOutput, setTestCaseOutput] = useState();
  const [programmingLanguage, setProgrammingLanguage] = useState("");
  const [rightSolution, setRightSolution] = useState(false);
  const [testCasesUsed, setTestCasesUsed] = useState();

  const addItem = (item) => {
    setArray((prevArray) => [...prevArray, item]);
  };

  const runCode = async () => {
    setIsRunning(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/code_execute", {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify({
          question: questionFromParams,
          code: code,
          // questionFromParams,
          // "code": testCasesFromParams,
          constraints: constraintsFromParams,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setIsRunning(false);
        throw new Error("Network response was not ok");
      }
      let data = await response.json();
      console.log("data", data);
      if (data.includes("```json")) {
        data = data.replace("```json\n", "");
        data = data.slice(0, -4);
      }

      console.log("data", data);
      data = JSON.parse(data);
      setTimeComplexity(data.time_complexity);
      setSpaceComplexity(data.space_complexity);
      setErrors(data.errors);
      setCodeQualityMeter(data.code_quality_meter);
      setCodeReport(data.code_report);
      setOptimalSolution(data.optimal_solution);
      setTestCaseOutput(data.test_case_output);
      setProgrammingLanguage(data.programming_language);
      setTestCasesUsed(data.test_cases_used);
      setRightSolution(data.right_solution);
      setIsRunning(false);
    } catch (e) {
      setIsRunning(false);

      console.error("Error:", e);
    }
  };

  return (
    <div className="m-6">
      <HeaderDiv />
      <div className="m-4">
        <Link
          className="bg-gray-800 text-white font-semibold text-sm px-6 py-2 rounded-lg shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50 transition duration-150 ease-in-out"
          href="/setup"
        >
          Generate another question
        </Link>
      </div>
      <div className="max-w-xl  mx-auto px-2 py-8">
        <h1 className="text-2xl font-bold text-left mb-6">Question</h1>
        <h1 className="text-lg text-left mb-6">{questionFromParams}</h1>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Difficulty:</h2>
            <p className="text-lg text-gray-700">{difficultyFromParams}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Constraints:</h2>
            <p className="text-lg text-gray-700">{constraintsFromParams}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Topics:</h2>
            <ul className="list-disc list-inside">{topicsFromParams}</ul>
          </div>
          <div id="codeeditor">
            <h2 className="text-xl font-semibold">Test Cases:</h2>
            <ul>{testCasesFromParams}</ul>
          </div>
        </div>
      </div>
      <Navbar sections={sections} />
      <AlertDialog>
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
                <div>
                  {code.trim() === "" ? (
                    <Button disabled className="bg-black text-white">
                      Evaluate
                    </Button>
                  ) : (
                    <div className="bg-black text-white font-semibold text-sm px-4 py-3 rounded-lg shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50 transition duration-150 ease-in-out">
                      <AlertDialogTrigger onClick={runCode}>
                        Evaluate
                      </AlertDialogTrigger>
                    </div>
                  )}
                </div>
              )}
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {isRunning
                      ? "Gemini is Evaluating your Submission 🚀"
                      : "Evaluated ✅"}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {isRunning
                      ? "Please Wait 🕒"
                      : "You may now Close the Dialog"}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  {!isRunning && (
                    <>
                      <AlertDialogCancel>Close</AlertDialogCancel>
                    </>
                  )}
                </AlertDialogFooter>
              </AlertDialogContent>
            </div>
            <code className="text-sm">
              we'll detect your preferred language automagically 🪄
            </code>
            <div className="flex justify-end m-2"></div>
            <CodeEditor code={code} setCode={setCode} />
          </div>
          <div
            id="testcasesoutput"
            className="execution rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950"
          >
            <h2 className="mb-4 text-lg font-medium">Test Cases Output</h2>
            {convertElementsToStrings(testCaseOutput)}
            {convertElementsToStrings(testCasesUsed)}
          </div>
          <div
            id="codemetrics"
            className="code-metrics rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950"
          >
            <h2 className="mb-4 text-lg font-medium">Code Metrics 🧮</h2>
            <CodeMetrics
              time_complexity={timeComplexity}
              space_complexity={spaceComplexity}
              code_quality_meter={codeQualityMeter}
            />
            <div>Language detected: {programmingLanguage}</div>
          </div>
          <div
            id="optimalsolution"
            className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950"
          >
            <h2 className="mb-4 text-lg font-medium">Optimal Solution</h2>
            <ScrollArea className="h-[300px] rounded-md border border-gray-200 bg-gray-50 p-3 text-sm shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
              <pre className="whitespace-pre-wrap break-words">
                <code>{optimalSolution}</code>
              </pre>
            </ScrollArea>
          </div>{" "}
          <div
            id="codereport"
            className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950"
          >
            <h2 className="mb-4 text-lg font-medium">Code Report</h2>
            <ScrollArea className="h-[300px] rounded-md border border-gray-200 bg-gray-50 p-3 text-sm shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
              <pre className="whitespace-pre-wrap break-words">
                <code>{codeReport}</code>
              </pre>
            </ScrollArea>
          </div>{" "}
          <div
            id="resources"
            className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950"
          >
            <h2 className="mb-4 text-lg font-medium"></h2>
            <div>
              <FetchYouTubeData qs={trimQuestion(questionFromParams)} />
            </div>
          </div>
        </div>
      </AlertDialog>
    </div>
  );
}

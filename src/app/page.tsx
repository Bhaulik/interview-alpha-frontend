import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import CodeEditor from "@/components/ui/codeeditor";

export default function Home() {
  return (
    <div className="m-6">
      <h1 className="text-2xl flex justify-center m-4">
        Code O Practice - Powered by Gemini
      </h1>
      <h1 className="text-md flex justify-center m-4">Question:</h1>

      <div className="mt-20 m grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:gap-8">
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium">Write Solution Here</h2>
            <Button>Run</Button>
          </div>
          {/* <Textarea
          className="h-[300px] w-full resize-none rounded-md border border-gray-200 bg-gray-50 p-3 text-sm shadow-sm transition-colors focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-gray-600 dark:focus:ring-gray-600"
          placeholder="Enter your code here..."
        /> */}
          <CodeEditor />
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <h2 className="mb-4 text-lg font-medium">Test Cases Output</h2>
          <ScrollArea className="h-[300px] rounded-md border border-gray-200 bg-gray-50 p-3 text-sm shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
            <pre className="whitespace-pre-wrap break-words">
              <code>
                {`
          function greet(name) {
            console.log('Hello, ' + name + '!');
          }
          
          greet('World');
                      `}
              </code>
            </pre>
          </ScrollArea>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium">Solution</h2>
            <Button>Run</Button>
          </div>
          <Textarea
            className="h-[300px] w-full resize-none rounded-md border border-gray-200 bg-gray-50 p-3 text-sm shadow-sm transition-colors focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-gray-600 dark:focus:ring-gray-600"
            placeholder="Enter your code here..."
          />
          <p>Detected Language: </p>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <h2 className="mb-4 text-lg font-medium">Output</h2>
          <ScrollArea className="h-[300px] rounded-md border border-gray-200 bg-gray-50 p-3 text-sm shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
            <pre className="whitespace-pre-wrap break-words">
              <code>
                {`
          function greet(name) {
            console.log('Hello, ' + name + '!');
          }
          
          greet('World');
                      `}
              </code>
            </pre>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

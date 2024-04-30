import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function HeaderDiv() {
  return (
    <div>
      {" "}
      <div className="flex justify-between m-4">
        <div>
          <h1 className="text-2xl ">Interview Alpha AI</h1>
          <span className="text-sm">Powered by Google Gemini AI</span>
          <a target="_blank" href="https://www.linkedin.com/in/bhaulik/">
            <p className="text-sm underline">Developed by Bhaulik</p>
          </a>
        </div>
        <div>
          <div className="flex">
            <Input
              className="w-80"
              placeholder="Enter your GOOGLE_API_KEY here"
            />
            <Button className="ml-2 bg-blue-400">USE KEY</Button>
          </div>
          <p className="text-xs italic underline text-gray-600 mt-1">
            <a
              target="_blank"
              href="https://support.google.com/googleapi/answer/6158862?hl=en"
            >
              not sure where to find it?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default HeaderDiv;

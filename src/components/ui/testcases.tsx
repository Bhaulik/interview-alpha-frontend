"use client";
import React, { useState, useEffect } from "react";

export default function TestCaseDisplay({ text }) {
  const [testCases, setTestCases] = useState([]);
  const [timeComplexity, setTimeComplexity] = useState("");
  const [spaceComplexity, setSpaceComplexity] = useState("");

  useEffect(() => {
    // Parsing logic
    const parseData = (text) => {
      const testCasesRegex =
        /(?:\*\*Test Case (\d+):?\*\* Input: nums = \[([^\]]+)\], target = (\d+) Output: \[([^\]]+)\])/g;
      const timeComplexityRegex = /\*\*Time Complexity:\*\* ([^\n]+)/;
      const spaceComplexityRegex = /\*\*Space Complexity:\*\* ([^\n]+)/;

      const testCases = [];
      let match;

      while ((match = testCasesRegex.exec(text)) !== null) {
        const [_, caseNumber, nums, target, output] = match;
        testCases.push({
          caseNumber: parseInt(caseNumber),
          nums: JSON.parse(`[${nums}]`),
          target: parseInt(target),
          output: JSON.parse(`[${output}]`),
        });
      }

      const timeComplexity = text.match(timeComplexityRegex)[1];
      const spaceComplexity = text.match(spaceComplexityRegex)[1];

      setTestCases(testCases);
      setTimeComplexity(timeComplexity);
      setSpaceComplexity(spaceComplexity);
    };

    parseData(text);
  }, [text]);

  return (
    <div>
      <h2>Test Cases</h2>
      {testCases.map((test, index) => (
        <div key={index}>
          <h3>Test Case {test.caseNumber}</h3>
          <p>
            Input: nums = {JSON.stringify(test.nums)}, target = {test.target}
          </p>
          <p>Output: {JSON.stringify(test.output)}</p>
        </div>
      ))}
      <h2>Complexities</h2>
      <p>
        <strong>Time Complexity:</strong> {timeComplexity}
      </p>
      <p>
        <strong>Space Complexity:</strong> {spaceComplexity}
      </p>
    </div>
  );
}

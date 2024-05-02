"use client";
import React from "react";
import Link from "next/link";

function convertElementsToStrings(arr) {
  return arr.map((item) => {
    if (typeof item === "object" && item !== null) {
      // Convert object to string using JSON.stringify for a straightforward representation
      return JSON.stringify(item);
    }
    // Return the item as is if it's already a string or any other type
    return item;
  });
}

function convertElementsToSingleString(arr) {
  var res = [];
  return arr.map((item) => {
    if (typeof item === "object" && item !== null) {
      // Convert object to string using JSON.stringify for a straightforward representation
      res.push(JSON.stringify(item));
    } else {
      res.push(item);
    }
    // Return the item as is if it's already a string or any other type
    return res.join(", ");
  });
}

function GeneratedQuestion({ questionData: questionDataParsed }) {
  // const data = questionData;
  // Ensure data is not undefined and is correctly parsed
  if (!questionDataParsed) {
    return <div>Data Not Loaded Yet!</div>;
  }

  // Attempt to parse the data if it's in string format
  console.log("json parsing data", questionDataParsed);
  try {
    console.log("json parsing data", questionDataParsed);
    questionDataParsed = JSON.parse(questionDataParsed);
    console.log(questionDataParsed);
  } catch (error) {
    console.error("Error parsing data:", error);
    return <div>Please try to regenerate the question 😊</div>;
  }

  console.log("The question object is: ", questionDataParsed);

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-left mb-6">Question</h1>
      <h1 className="text-xl font-bold text-left mb-6">
        {questionDataParsed.problem}
      </h1>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Difficulty:</h2>
          <p className="text-lg text-gray-700">
            {questionDataParsed.difficulty}
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Constraints:</h2>
          <p className="text-lg text-gray-700">
            {questionDataParsed.constraints}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Topics:</h2>
          <ul className="list-disc list-inside">
            {questionDataParsed.topics.map((topic, index) => (
              <li key={index} className="text-lg text-gray-700">
                {topic}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Test Cases:</h2>
          <ul className="list-disc list-inside">
            {Array.isArray(questionDataParsed.test_cases) &&
              convertElementsToStrings(questionDataParsed.test_cases).map(
                (topic, index) => (
                  <li key={index} className="text-lg text-gray-700">
                    {topic}
                  </li>
                )
              )}
          </ul>
        </div>
        <div>
          <Link
            className="text-blue-500 hover:text-blue-700"
            href={{
              pathname: "/solvequestion",
              query: {
                q: questionDataParsed.problem,
                test_cases: convertElementsToSingleString(
                  questionDataParsed.test_cases
                ),
                topics: questionDataParsed.topics,
                constraints: questionDataParsed.constraints,
                difficulty: questionDataParsed.difficulty,
              },
            }}
          >
            Solve Problem
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GeneratedQuestion;

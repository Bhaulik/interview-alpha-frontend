"use client";
import React from "react";

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

function GeneratedQuestion({ questionData }) {
  const data = questionData;
  // Ensure data is not undefined and is correctly parsed
  if (!data) {
    return <div>Data Not Loaded Yet!</div>;
  }

  // Attempt to parse the data if it's in string format
  console.log("json parsing data", data);
  try {
    console.log("json parsing data", data);
    questionData = JSON.parse(data);
    console.log(questionData);
  } catch (error) {
    console.error("Error parsing data:", error);
    return <div>Please try to regenerate the question 😊</div>;
  }

  console.log("The question object is: ", questionData);

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold text-left mb-6">
        {questionData.problem}
      </h1>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Difficulty:</h2>
          <p className="text-lg text-gray-700">{questionData.difficulty}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Constraints:</h2>
          <p className="text-lg text-gray-700">{questionData.constraints}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Topics:</h2>
          <ul className="list-disc list-inside">
            {questionData.topics.map((topic, index) => (
              <li key={index} className="text-lg text-gray-700">
                {topic}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Test Cases:</h2>
          <ul className="list-disc list-inside">
            {Array.isArray(questionData.test_cases) &&
              convertElementsToStrings(questionData.test_cases).map(
                (topic, index) => (
                  <li key={index} className="text-lg text-gray-700">
                    {topic}
                  </li>
                )
              )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GeneratedQuestion;

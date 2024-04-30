"use client";
import React from "react";
import { useState } from "react";

function GeneratedQuestion(data: any) {
  if (!data) {
    return <div>Data Not Loaded yet!</div>;
  }

  // Find the start and end of the JSON data
  const startIndex = data.indexOf("{");
  const endIndex = data.lastIndexOf("}") + 1;

  console.log("The question object is ");
  data = JSON.parse(data);
  return (
    <div>
      <div>
        <h1 className="text-2xl">{data.problem}</h1>
        <h1 className="text-2xl">HI THERE how are you!!!</h1>
      </div>
    </div>
  );
}

export default GeneratedQuestion;

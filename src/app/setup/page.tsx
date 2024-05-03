"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox"; // Import the Checkbox component from shadcn
import { Button } from "@/components/ui/button";
import HeaderDiv from "@/components/ui/headerdiv";
import GeneratedQuestion from "@/components/ui/generatedquestion";

export default function Setup() {
  const [difficulty, setDifficulty] = useState("medium");
  const [dataStructures, setDataStructures] = useState(new Set());
  const [generatedQuestion, setGeneratedQuestion] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const items = ["array", "hash-map", "linked-list", "trees", "graphs", "Any"];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = {
      difficulty,
      ds: Array.from(dataStructures).join(", "), // Assuming API can handle this format, adjust if needed
    };

    console.log(body);

    try {
      setIsLoading(true);
      const response = await fetch(
        "http://127.0.0.1:8000/generate_leetcode_question_breakdown",
        {
          method: "POST",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        setIsLoading(false);
        setGeneratedQuestion(
          "Error Generating the Question, try again or contact the Developer"
        );
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setIsLoading(false);
      setGeneratedQuestion(data.content);
      console.log("Response data:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDataStructureChange = (item) => {
    setDataStructures((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(item)) {
        newSet.delete(item);
      } else {
        newSet.add(item);
      }
      return newSet;
    });
  };

  return (
    <div>
      <HeaderDiv />
      <div className="mx-auto max-w-4xl space-y-8 py-12 md:py-20">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Generate Interview Coding Question
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Create a coding interview-style challenge with this form.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select
                value={difficulty}
                onValueChange={(e) => setDifficulty(e)}
                defaultValue="medium"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="data-structures">Data Structures</Label>
              <div className="grid grid-cols-3 gap-2">
                {items.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Checkbox
                      checked={dataStructures.has(item)}
                      onCheckedChange={() => handleDataStructureChange(item)}
                    />
                    <Label>{item}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {isloading ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit">Generate Question</Button>
          )}
        </form>
        <div>
          <code>
            {isloading
              ? "Loading..."
              : GeneratedQuestion({ questionData: generatedQuestion })}
          </code>
        </div>
      </div>
    </div>
  );
}

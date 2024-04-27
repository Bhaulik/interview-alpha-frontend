interface LeetCodeQuestion {
  name: string;
  difficulty: string;
  description: string;
  exampleInput: string;
  exampleOutput: string;
}

const leetcodeQuestions: LeetCodeQuestion[] = [
  {
    name: "Two Sum",
    difficulty: "Easy",
    description:
      "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
    exampleInput: "[2, 7, 11, 15], 9",
    exampleOutput: "[0, 1]",
  },
  {
    name: "Reverse Integer",
    difficulty: "Easy",
    description: "Given a 32-bit signed integer, reverse digits of an integer.",
    exampleInput: "123",
    exampleOutput: "321",
  },
  {
    name: "Palindrome Number",
    difficulty: "Easy",
    description:
      "Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.",
    exampleInput: "121",
    exampleOutput: "true",
  },
];

console.log("LeetCode Questions (Easy):");
leetcodeQuestions.forEach((question, index) => {
  console.log(`${index + 1}. ${question.name}`);
  console.log(`   Difficulty: ${question.difficulty}`);
  console.log(`   Description: ${question.description}`);
  console.log(`   Example Input: ${question.exampleInput}`);
  console.log(`   Example Output: ${question.exampleOutput}`);
});

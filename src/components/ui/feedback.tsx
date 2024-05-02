import React from "react";

const CodeMetrics = ({
  time_complexity,
  space_complexity,
  code_quality_meter,
}) => {
  // const {
  //   time_complexity,
  //   space_complexity,
  //   code_quality_meter,
  // } = metrics;

  const complexityToPercentage = (complexity) => {
    // Simple example of mapping, needs real logic based on actual expected values
    const normalizedComplexity = complexity.replace(/\s+/g, "").toLowerCase();
    switch (normalizedComplexity) {
      case "o(1)":
        return 100;
      case "o(log n)":
        return 90;
      case "o(n)":
        return 70;
      case "o(n log n)":
        return 50;
      case "o(n^2)":
        return 20;
      default:
        return 0; // for "O(n^3)" or worse, and any undefined complexities
    }
  };

  const getColor = (value) => {
    if (value <= 20) return "bg-red-500";
    if (value <= 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-gray-700">
            Time Complexity: {time_complexity}
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className={`h-2.5 rounded-full ${getColor(
                complexityToPercentage(time_complexity)
              )}`}
              style={{ width: `${complexityToPercentage(time_complexity)}%` }}
            ></div>
          </div>
        </div>
        <div>
          <h3 className="font-medium text-gray-700">
            Space Complexity: {space_complexity}
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className={`h-2.5 rounded-full ${getColor(
                complexityToPercentage(space_complexity)
              )}`}
              style={{ width: `${complexityToPercentage(space_complexity)}%` }}
            ></div>
          </div>
        </div>
        <div>
          <h3 className="font-medium text-gray-700">
            Code Quality: {code_quality_meter}/10
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className={`h-2.5 rounded-full ${getColor(
                code_quality_meter * 10
              )}`}
              style={{ width: `${code_quality_meter * 10}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeMetrics;

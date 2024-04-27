from fastapi import FastAPI
from langchain_google_genai import ChatGoogleGenerativeAI
import requests
import os
from fastapi.middleware.cors import CORSMiddleware
from langchain_core.prompts import PromptTemplate

# Import environment variables securely
if "GOOGLE_API_KEY" not in os.environ:
    os.environ["GOOGLE_API_KEY"] =  'AIzaSyCUGkPx62RfjV1TtTjDjEXinnr9kWzUYSA' #input("Enter your Google API key: ")
origins = [
    "http://localhost",
    "http://localhost:3000",
]
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Initialize the API with the secure environment variable
llm = ChatGoogleGenerativeAI(model="gemini-pro", google_api_key=os.environ["GOOGLE_API_KEY"])

def build_prompt(input_code):
    template = f"""
    >>>>> Introduction
    You are tasked with evaluating the following Python function. Please provide a detailed analysis.

    >>>>> Provided Code
    ||| {input_code} |||

    >>>>> Evaluation Results
    ----- Execution: Please simulate the function execution and provide outputs for given test cases.
    ----- Optimization: Suggest any potential improvements in code efficiency.

    >>>>> Errors and Warnings
    ----- List any syntax errors or logical mistakes.
    ----- Highlight possible exceptions and handle them in the provided code.

    >>>>> Conclusion
    Summarize the overall code quality and provide final recommendations.

    >>>>> End of Analysis
    
    For example: 
**Introduction:**

The provided Python function, `twoSums`, is designed to find two elements in a given list `nums` that sum up to a specified `target`.

**Execution:**

**Test Case 1:**
Input: `nums = [2, 7, 11, 15]`, `target = 9`
Output: `[0, 1]` (Indices of elements 2 and 7)

**Test Case 2:**
Input: `nums = [3, 2, 4]`, `target = 6`
Output: `[1, 2]` (Indices of elements 2 and 4)

**Test Case 3:**
Input: `nums = [3, 3]`, `target = 6`
Output: `[0, 1]` (Indices of both elements 3)

**Optimization:**

The code can be optimized in terms of efficiency:

* **Use a Set Instead of a Dictionary:** The `complements` dictionary can be replaced with a set, which offers faster lookup and insertion.
* **Early Return:** After finding the pair of numbers that sum up to the target, the function can return immediately instead of iterating through the entire list.

**Errors and Warnings:**

* **Logical Error:** The code may not handle cases where the `target` is less than the smallest number in `nums`.
* **Exception Handling:** The code does not handle the case where the target sum is not found.

**Conclusion:**

Overall, the code is functionally correct but can be improved in terms of efficiency and exception handling.

**Recommendations:**

* **Optimization:** Implement the suggested optimizations to enhance code performance.
* **Error Handling:** Add an exception handler to handle the case where the target sum is not found.
* **Documentation:** Provide clear documentation explaining the purpose of the function and any assumptions or limitations.

**Improved Code:**

```python
def twoSums(self, nums: List[int], target: int) -> List[int]:
    complements = set()
    for i, num in enumerate(nums):
        complement = target - num
        if complement in complements:
            return [complements.pop(complement), i]
        else:
            complements.add(num)
    return []

    """
    return template

@app.get("/")
async def root():
    try:
        # Invoke the model and handle errors gracefully
        code = """
        def twoSums(self, nums: List[int], target: int) -> List[int]:
        complements = {}
        for i, num in enumerate(nums):
            complement = target-num
            if num in complements:
                complements[complement] = i
            else:
                return [complements[num], i]
        
        return []
        """
        q = build_prompt(code)
        # print(q)
        
        result = llm.invoke(q)
        # print(result)
        # print(result)
        # print(result.content)
        # Check if the API call was successful
        # if result.status_code == 200:
        
        return {"message": result.content, "input": code}
        # else:
        #     return {"error": "Failed to retrieve content from API", "status": result.status_code}
    except Exception as e:
        return {"error": str(e)}
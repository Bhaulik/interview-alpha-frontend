import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function FetchYouTubeData({ qs }) {
  const [videoLinks, setVideoLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cleanedUrls, setCleanedUrls] = useState([]);

  const handleFetchData = async () => {
    setIsLoading(true);
    setError(null);
    console.log("qs", qs);
    console.log("qs type", typeof qs);
    try {
      const response = await fetch("http://127.0.0.1:8000/youtube", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          question: "max subarray",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Fetched data:", data); // Debug the structure of data
      console.log("Fetched data type:", typeof data);

      let dataP = data.trim().slice(1, -1);
      let cleanedUrls = dataP.split("', '");
      cleanedUrls[0] = cleanedUrls[0].slice(1);
      cleanedUrls[cleanedUrls.length - 1] = cleanedUrls[
        cleanedUrls.length - 1
      ].slice(0, -1);
      console.log("cleanedUrls", cleanedUrls);
      setCleanedUrls(cleanedUrls);
    } catch (error) {
      setError("Failed to load data: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button
        className="btn btn-outline btn-primary"
        onClick={handleFetchData}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Find Video Resources on Youtube"}
      </Button>
      <div className="italic underline mt-2 mb-2">About: {qs}</div>
      {error && <p>Error: {error}</p>}
      {cleanedUrls.length > 0 && (
        <div>
          <h3>YouTube Videos:</h3>
          <ul className="text-black">
            {cleanedUrls.map((link, index) => (
              <ol key={index} className=" m-2 ">
                {index + 1}.{" "}
                <a
                  href={link}
                  target="_blank"
                  className="text-orange-600  underline"
                >
                  {link}
                </a>
              </ol>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FetchYouTubeData;

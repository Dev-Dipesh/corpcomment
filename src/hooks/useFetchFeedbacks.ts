import { useEffect } from "react";
import useFeedbacksStore from "../stores/feedbacksStore";

export default function useFetchFeedbacks(url: string): void {
  const { setFeedbacks, setIsLoading, setError } = useFeedbacksStore();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const jsonData = await response.json();
        setFeedbacks(jsonData.feedbacks || []); // Assuming the JSON has a "feedbacks" key
        setError("");
      } catch (e) {
        if (e instanceof Error) {
          if (e.name === "AbortError") {
            console.log("Fetch aborted:", e.message);
            // Optionally handle abort-specific logic here, if needed.
            // Don't set the error state for abort errors.
          } else {
            console.log("error: ", e.message);
            setError(e.message); // Handle other errors normally.
          }
        } else if (typeof e === "string") {
          setError(e);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, setFeedbacks, setIsLoading, setError]); // Depend on Zustand setters
}

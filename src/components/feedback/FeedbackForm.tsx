import { useState } from "react";
import { MAX_CHARACTERS } from "../../lib/constants";
import useFeedbacksStore from "../../stores/feedbacksStore";
import { TFeedback } from "../../lib/types";

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const [showValidIndicator, setShowValidIndicator] = useState(false);
  const [showInvalidIndicator, setShowInvalidIndicator] = useState(false);
  const charCount = MAX_CHARACTERS - feedback.length;

  const { submitFeedback } = useFeedbacksStore((state) => ({
    submitFeedback: state.submitFeedback,
  }));

  function handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setFeedback(e.target.value);
  }

  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (feedback.trim() === "") {
      setShowInvalidIndicator(true);
      setTimeout(() => {
        setShowInvalidIndicator(false);
      }, 2000);
      return;
    }

    if (feedback.includes("#") && feedback.length >= 3) {
      // Show valid indicator
      setShowValidIndicator(true);
      // disable after some time
      setTimeout(() => {
        setShowValidIndicator(false);
      }, 2000);
    } else {
      // Show invalid indicator
      setShowInvalidIndicator(true);
      setTimeout(() => {
        setShowInvalidIndicator(false);
      }, 2000);
      return;
    }

    const company =
      feedback
        .split(" ")
        .find((word) => word.includes("#"))
        ?.substring(1) || "";
    const newFeedback: TFeedback = {
      id: Date.now(),
      company,
      badgeLetter: company[0].toUpperCase(),
      text: feedback,
      upvoteCount: 0,
      daysAgo: 0,
    };

    submitFeedback(newFeedback);
    setFeedback("");
  }

  return (
    <form
      className={`form ${showValidIndicator ? "form--valid" : ""} ${
        showInvalidIndicator ? "form--invalid" : ""
      }`}
      onSubmit={handleOnSubmit}
    >
      <textarea
        id="feedback-textarea"
        placeholder="Enter your feedback here, remember to #hashtag the company."
        spellCheck="false"
        value={feedback}
        maxLength={MAX_CHARACTERS}
        onChange={handleOnChange}
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company.
      </label>
      <div>
        <p className="u-italic">{charCount}</p>
        <button type="submit">
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}

import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import useFeedbacksStore from "../../stores/feedbacksStore";

export default function FeedbackList() {
  const { filteredFeedbacks, isLoading, error } = useFeedbacksStore(
    (state) => ({
      filteredFeedbacks: state.getFilteredFeedbacks(),
      isLoading: state.isLoading,
      error: state.error,
    })
  );

  return (
    <div className="feedback-list">
      {isLoading && <Spinner />}
      {error && <ErrorMessage />}
      {filteredFeedbacks && (
        <ol>
          {filteredFeedbacks.map((feedback) => (
            <FeedbackItem key={feedback.id} {...feedback} />
          ))}
        </ol>
      )}
    </div>
  );
}

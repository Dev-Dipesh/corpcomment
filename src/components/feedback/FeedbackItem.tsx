import { TriangleUpIcon } from "@radix-ui/react-icons";
import { TFeedback } from "../../lib/types";
import useFeedbacksStore from "../../stores/feedbacksStore";

export default function FeedbackItem(props: TFeedback) {
  const { id, company, badgeLetter, text, upvoteCount, daysAgo } = props;
  const upVoteFeedback = useFeedbacksStore((state) => state.upVoteFeedback);

  const handleUpVote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    upVoteFeedback(id);
    e.currentTarget.disabled = true;
  };

  return (
    <li key={id} className="feedback">
      <button onClick={handleUpVote}>
        <TriangleUpIcon />
        <span>{upvoteCount}</span>
      </button>
      <div>
        <p>{badgeLetter}</p>
      </div>
      <div>
        <p>{company.toUpperCase()}</p>
        <p>{text}</p>
      </div>
      <p>{daysAgo}d</p>
    </li>
  );
}

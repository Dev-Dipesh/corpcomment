import useFeedbacksStore from "../stores/feedbacksStore";

export default function HashTagsList() {
  const { hashTags, setFilter } = useFeedbacksStore((state) => ({
    hashTags: state.hashTags,
    setFilter: state.setFilter,
  }));

  return (
    <ul className="hashtags">
      <li key="#all">
        <button
          onClick={(e) => {
            e.preventDefault();
            setFilter("#all");
          }}
        >
          ALL
        </button>
      </li>
      {hashTags.map((hashTag) => (
        <li key={hashTag}>
          <button
            onClick={(e) => {
              e.preventDefault();
              setFilter(hashTag);
            }}
          >
            {hashTag}
          </button>
        </li>
      ))}
    </ul>
  );
}

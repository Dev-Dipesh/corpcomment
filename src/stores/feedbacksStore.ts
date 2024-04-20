import { create } from "zustand";
import { TFeedback } from "../lib/types";
import { POST_FEEDBACKS_API } from "../lib/constants";

type TFeedbackState = {
  feedbacks: TFeedback[];
  hashTags: string[];
  currentFilter: string;
  isLoading: boolean;
  error: string;
};

type TFeedbackActions = {
  setFeedbacks: (feedbacks: TFeedback[]) => void;
  setHashTags: (hashTags: string[]) => void;
  setFilter: (filter: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string) => void;
  upVoteFeedback: (id: number) => void;
  getFilteredFeedbacks: () => TFeedback[];
  submitFeedback: (newFeedback: TFeedback) => Promise<void>;
};

type TFeedbackStore = TFeedbackState & TFeedbackActions;

const useFeedbacksStore = create<TFeedbackStore>((set, get) => ({
  feedbacks: [],
  hashTags: [],
  currentFilter: "#all",
  isLoading: false,
  error: "",
  setFeedbacks: (feedbacks: TFeedback[]) => {
    // Extract hashtags from all feedbacks and remove duplicates
    const hashTags = [
      ...new Set(
        feedbacks.flatMap((feedback) => extractHashTags(feedback.text))
      ),
    ];

    set({
      feedbacks,
      hashTags,
    });
  },
  setFilter: (filter) => set({ currentFilter: filter.toLowerCase() }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setHashTags: (hashTags) => set({ hashTags }),
  upVoteFeedback: (id: number) => {
    const feedbacks = get().feedbacks.map((feedback) => {
      if (feedback.id === id) {
        return { ...feedback, upvoteCount: feedback.upvoteCount + 1 };
      }
      return feedback;
    });
    set({ feedbacks });
  },
  getFilteredFeedbacks: () => {
    const { feedbacks, currentFilter } = get();

    if (currentFilter === "#all") {
      return feedbacks;
    }

    /**
     * Regular expression used to match hashtags in a string.
     *
     * The regex pattern matches a hashtag that starts with the specified lowercase hashtag followed by alphanumeric characters, apostrophes, or the special character ’.
     *
     * The hashtag can be preceded by whitespace or the start of the string, and can be followed by whitespace, punctuation marks, or the end of the string.
     *
     * The regex consists of the following parts:
     * - Preceding expression: Matches whitespace or the start of the string.
     * - Hashtag expression: Matches the specified lowercase hashtag.
     * - Lookahead expression: Matches alphanumeric characters, apostrophes, or the special character ’.
     * - Following expression: Matches whitespace, punctuation marks, or the end of the string.
     *
     * The matching is case-insensitive.
     * The \b denotes a word boundary, ensuring we match whole words only
     */
    const regex = new RegExp(
      `(?:^|\\s)(${currentFilter}[\\w'’]*)(?=\\s|$|[,.!?])`,
      "i"
    );

    return feedbacks.filter((feedback) => regex.test(feedback.text));
  },
  submitFeedback: async (newFeedback: TFeedback) => {
    set({ isLoading: true });
    try {
      const response = await fetch(POST_FEEDBACKS_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFeedback),
      });
      if (response.status === 201) {
        // Assuming ID and other potential server-side generated fields are not essential
        // for the immediate UI update, we proceed to add the feedback optimistically.
        set((state) => ({
          feedbacks: [...state.feedbacks, { ...newFeedback }],
          hashTags: [
            ...new Set([
              ...state.hashTags,
              ...extractHashTags(newFeedback.text),
            ]),
          ],
          isLoading: false,
        }));
      } else {
        throw new Error("Failed to submit feedback");
      }
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        isLoading: false,
      });
    }
  },
}));

const extractHashTags = (text: string): string[] => {
  return (text.match(/#(\w+)/g) || []).map((tag) => tag.toLowerCase());
};

export default useFeedbacksStore;

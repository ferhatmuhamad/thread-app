import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREADS:
    return action.payload.threads;
  case ActionType.TOGGLE_UPVOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        const isUpVoted = thread.upVotesBy.includes(action.payload.userId);
        return {
          ...thread,
          upVotesBy: isUpVoted
            ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
            : [...thread.upVotesBy, action.payload.userId],
          downVotesBy: thread.downVotesBy.filter(
            (id) => id !== action.payload.userId,
          ),
        };
      }
      return thread;
    });
  case ActionType.TOGGLE_DOWNVOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        const isDownVoted = thread.downVotesBy.includes(
          action.payload.userId,
        );
        return {
          ...thread,
          downVotesBy: isDownVoted
            ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
            : [...thread.downVotesBy, action.payload.userId],
          upVotesBy: thread.upVotesBy.filter(
            (id) => id !== action.payload.userId,
          ),
        };
      }
      return thread;
    });
  case ActionType.NEUTRAL_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        return {
          ...thread,
          upVotesBy: thread.upVotesBy.filter(
            (id) => id !== action.payload.userId,
          ),
          downVotesBy: thread.downVotesBy.filter(
            (id) => id !== action.payload.userId,
          ),
        };
      }
      return thread;
    });
  default:
    return threads;
  }
}

export default threadsReducer;

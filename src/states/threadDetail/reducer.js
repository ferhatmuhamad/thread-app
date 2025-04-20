import { ActionType } from './action';

function detailThreadReducer(detailThread = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.detailThread;
  case ActionType.TOGGLE_UPVOTE_THREAD_DETAIL:
    return {
      ...detailThread,
      upVotesBy: [...detailThread.upVotesBy, action.payload.userId],
      downVotesBy: detailThread.downVotesBy.filter(
        (id) => id !== action.payload.userId
      ),
    };
  case ActionType.TOGGLE_DOWNVOTE_THREAD_DETAIL:
    return {
      ...detailThread,
      downVotesBy: [...detailThread.downVotesBy, action.payload.userId],
      upVotesBy: detailThread.upVotesBy.filter(
        (id) => id !== action.payload.userId
      ),
    };
  case ActionType.NEUTRAL_VOTE_THREAD_DETAIL:
    return {
      ...detailThread,
      upVotesBy: detailThread.upVotesBy.filter(
        (id) => id !== action.payload.userId
      ),
      downVotesBy: detailThread.downVotesBy.filter(
        (id) => id !== action.payload.userId
      ),
    };
  case ActionType.THREAD_ADD_COMMENT:
    return {
      ...detailThread,
      comments: [...detailThread.comments, action.payload.comment],
    };
  case ActionType.TOGGLE_UPVOTE_COMMENT:
    return {
      ...detailThread,
      comments: detailThread.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.concat([action.payload.userId]),
            downVotesBy: comment.downVotesBy.filter(
              (id) => id !== action.payload.userId
            ),
          };
        }
        return comment;
      }),
    };
  case ActionType.TOGGLE_DOWNVOTE_COMMENT:
    return {
      ...detailThread,
      comments: detailThread.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            downVotesBy: comment.downVotesBy.concat([action.payload.userId]),
            upVotesBy: comment.upVotesBy.filter(
              (id) => id !== action.payload.userId
            ),
          };
        }
        return comment;
      }),
    };
  case ActionType.NEUTRAL_VOTE_COMMENT:
    return {
      ...detailThread,
      comments: detailThread.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.filter(
              (id) => id !== action.payload.userId
            ),
            downVotesBy: comment.downVotesBy.filter(
              (id) => id !== action.payload.userId
            ),
          };
        }
        return comment;
      }),
    };
  default:
    return detailThread;
  }
}

export default detailThreadReducer;

import React from 'react';
import {
  FaHeart,
  FaRegHeart,
  FaRegThumbsDown,
  FaThumbsDown,
} from 'react-icons/fa';
import parser from 'html-react-parser';
import { postedAt } from '../utils';
import PropTypes from 'prop-types';

function ThreadCommentList({ comments, handleVote, authUser }) {
  const {
    handleUpVoteComment,
    handleDownVoteComment,
    handleNeutralizeVoteComment,
  } = handleVote;

  const handleVoteAction = (action, thread, id) => {
    if (!authUser) {
      alert('Silakan login terlebih dahulu untuk memberikan suara.');
      return;
    }
    action(thread, id);
  };

  return (
    <section className="comment-section">
      <h3 className="section-title">Komentar ({comments.length})</h3>
      {comments.map((comment) => {
        const {
          id,
          content,
          createdAt,
          downVotesBy = [],
          upVotesBy = [],
          owner,
          thread,
        } = comment;

        const isUpVoted = upVotesBy.includes(authUser?.id);
        const isDownVoted = downVotesBy.includes(authUser?.id);

        return (
          <div key={id} className="comment-item">
            <div className="comment-header">
              <img src={owner.avatar} alt={owner.name} className="avatar" />
              <div>
                <strong>{owner.name}</strong>
                <p className="comment-date">{postedAt(createdAt)}</p>
              </div>
            </div>
            <div className="comment-content">{parser(content)}</div>
            <div className="thread-actions">
              <button
                className={`icon-button ${isUpVoted ? 'liked' : ''}`}
                onClick={() =>
                  handleVoteAction(
                    isUpVoted
                      ? handleNeutralizeVoteComment
                      : handleUpVoteComment,
                    thread,
                    id,
                  )
                }
              >
                {isUpVoted ? <FaHeart /> : <FaRegHeart />} {upVotesBy.length}
              </button>
              <button
                className={`icon-button ${isDownVoted ? 'disliked' : ''}`}
                onClick={() =>
                  handleVoteAction(
                    isDownVoted
                      ? handleNeutralizeVoteComment
                      : handleDownVoteComment,
                    thread,
                    id,
                  )
                }
              >
                {isDownVoted ? <FaThumbsDown /> : <FaRegThumbsDown />}{' '}
                {downVotesBy.length}
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
}

ThreadCommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string),
      upVotesBy: PropTypes.arrayOf(PropTypes.string),
      owner: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      thread: PropTypes.string.isRequired,
    }),
  ).isRequired,
  handleVote: PropTypes.shape({
    handleUpVoteComment: PropTypes.func.isRequired,
    handleDownVoteComment: PropTypes.func.isRequired,
    handleNeutralizeVoteComment: PropTypes.func.isRequired,
  }).isRequired,
  authUser: PropTypes.object,
};

export default ThreadCommentList;

import React from 'react';
import {
  FaHeart,
  FaRegHeart,
  FaRegThumbsDown,
  FaThumbsDown,
  FaReply,
} from 'react-icons/fa';
import parser from 'html-react-parser';
import { Link } from 'react-router-dom';
import { postedAt } from '../utils';
import PropTypes from 'prop-types';

function ThreadItem(props) {
  const {
    body,
    category,
    createdAt,
    downVotesBy,
    upVotesBy,
    id,
    title,
    totalComments,
    owner,
    authUser,
    threadVotes,
  } = props;

  const { onUpVoteThread, onDownVoteThread, onNeutralVoteThread } = threadVotes;

  const isUpVoted = upVotesBy.includes(authUser?.id);
  const isDownVoted = downVotesBy.includes(authUser?.id);

  return (
    <div className="thread-card">
      <div className="thread-meta">
        <span className="category-tag">#{category}</span>
      </div>

      <Link to={`/threads/${id}`} className="thread-link">
        <h3 className="thread-title">{title}</h3>
        <div className="thread-body">{parser(body)}</div>
      </Link>

      <div className="thread-actions">
        <button
          className={`icon-button ${isUpVoted ? 'liked' : ''}`}
          onClick={() => {
            isUpVoted ? onNeutralVoteThread(id) : onUpVoteThread(id);
          }}
        >
          {isUpVoted ? <FaHeart /> : <FaRegHeart />} {upVotesBy.length}
        </button>
        <button
          className={`icon-button ${isDownVoted ? 'disliked' : ''}`}
          onClick={() => {
            isDownVoted ? onNeutralVoteThread(id) : onDownVoteThread(id);
          }}
        >
          {isDownVoted ? <FaThumbsDown /> : <FaRegThumbsDown />}{' '}
          {downVotesBy.length}
        </button>
        <span className="icon-button">
          <FaReply /> {totalComments}
        </span>
        <span className="thread-created-at">{postedAt(createdAt)}</span>
        <span className="thread-author">
          <img
            src={owner.avatar || 'https://via.placeholder.com/150'}
            alt={owner.name}
            className="avatar"
            style={{ marginBottom: '-7px' }}
          />{' '}
          Dibuat oleh {owner.name}
        </span>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  threadVotes: PropTypes.shape({
    onUpVoteThread: PropTypes.func.isRequired,
    onDownVoteThread: PropTypes.func.isRequired,
    onNeutralVoteThread: PropTypes.func.isRequired,
  }).isRequired,
};

export default ThreadItem;

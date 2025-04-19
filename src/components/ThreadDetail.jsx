import React from 'react';
import {
  FaHeart,
  FaRegHeart,
  FaRegThumbsDown,
  FaThumbsDown,
  FaReply,
} from 'react-icons/fa';
import parser from 'html-react-parser';
import { postedAt } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncDownVoteThreadDetail,
  asyncNeutralVoteThreadDetail,
  asyncUpVoteThreadDetail,
} from '../states/threadDetail/action';
import PropTypes from 'prop-types';

function ThreadDetail(props) {
  const {
    id,
    title,
    body,
    category,
    createdAt,
    owner,
    upVotesBy,
    downVotesBy,
    comments,
  } = props;

  const dispatch = useDispatch();
  const authUser = useSelector((states) => states.authUser);

  const handleUpVoteThreadDetail = (id) => {
    if (!authUser) {
      alert('Silakan login untuk memberikan suara');
    }
    dispatch(asyncUpVoteThreadDetail(id));
  };

  const handleDownVoteThreadDetail = (id) => {
    if (!authUser) {
      alert('Silakan login untuk memberikan suara');
    }
    dispatch(asyncDownVoteThreadDetail(id));
  };

  const handleNeutralVoteThreadDetail = (id) => {
    if (!authUser) {
      alert('Silakan login untuk memberikan suara');
    }
    dispatch(asyncNeutralVoteThreadDetail(id));
  };

  const isUpVoted = upVotesBy.includes(authUser?.id);
  const isDownVoted = downVotesBy.includes(authUser?.id);

  const ownerName = owner?.name || 'Anonim';
  return (
    <div className="thread-detail-card" key={id}>
      <div className="category-tag">#{category}</div>
      <h2 className="thread-title">{title}</h2>
      <div className="thread-body">{parser(body)}</div>

      <div className="thread-actions">
        <button
          className={`icon-button ${isUpVoted ? 'liked' : ''}`}
          onClick={() => {
            isUpVoted
              ? handleNeutralVoteThreadDetail(id)
              : handleUpVoteThreadDetail(id);
          }}
        >
          {isUpVoted ? <FaHeart /> : <FaRegHeart />} {upVotesBy.length}
        </button>
        <button
          className={`icon-button ${isDownVoted ? 'disliked' : ''}`}
          onClick={() => {
            isDownVoted
              ? handleNeutralVoteThreadDetail(id)
              : handleDownVoteThreadDetail(id);
          }}
        >
          {isDownVoted ? <FaThumbsDown /> : <FaRegThumbsDown />}{' '}
          {downVotesBy.length}
        </button>
        <span className="icon-button">
          <FaReply /> {comments.length} Balasan
        </span>
        <span className="thread-created-at">{postedAt(createdAt)}</span>
        <span className="thread-author">
          <img
            src={owner.avatar}
            alt={owner.name}
            className="avatar"
            style={{ marginBottom: '-7px' }}
          />{' '}
          Dibuat oleh {ownerName}
        </span>
      </div>
    </div>
  );
}

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string),
  downVotesBy: PropTypes.arrayOf(PropTypes.string),
  comments: PropTypes.arrayOf(PropTypes.object),
};

export default ThreadDetail;

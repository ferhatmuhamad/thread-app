import React from 'react';
import ThreadItem from './ThreadItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncDownVoteThread,
  asyncNeutralVoteThread,
  asyncUpVoteThread,
} from '../states/threads/action';
import PropTypes from 'prop-types';

function ThreadList(props) {
  const { threads } = props;
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  const onUpVoteThread = (threadId) => {
    if (!authUser) {
      alert('Silakan Login untuk memberikan vote');
      return;
    }
    dispatch(asyncUpVoteThread(threadId));
  };

  const onDownVoteThread = (threadId) => {
    if (!authUser) {
      alert('Silakan Login untuk memberikan vote');
      return;
    }
    dispatch(asyncDownVoteThread(threadId));
  };

  const onNeutralVoteThread = (threadId) => {
    if (!authUser) {
      alert('Silakan Login untuk memberikan vote');
      return;
    }
    dispatch(asyncNeutralVoteThread(threadId));
  };

  const threadVotes = {
    onUpVoteThread,
    onDownVoteThread,
    onNeutralVoteThread,
  };

  return (
    <div className="thread-list">
      {threads.map((thread) => (
        <ThreadItem key={thread.id} {...thread} threadVotes={threadVotes} />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      owner: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      }).isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      totalComments: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default ThreadList;

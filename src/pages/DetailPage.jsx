import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ThreadDetail from '../components/ThreadDetail';
import ThreadCommentInput from '../components/ThreadCommentInput';
import ThreadCommentList from '../components/ThreadCommentList';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncAddComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
  asyncReceiveThreadDetail,
  asyncUpVoteComment,
} from '../states/threadDetail/action';
import { asyncPreloadProcess } from '../states/isPreload/action';
import Loading from '../components/Loading';

function DetailPage() {
  const { id } = useParams();
  const detailThread = useSelector((states) => states.detailThread);
  const isPreload = useSelector((states) => states.isPreload.isPreload);
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onComment = (content) => {
    dispatch(asyncAddComment(id, content));
  };

  if (isPreload) {
    return null;
  }

  if (!detailThread) {
    return null;
  }

  const handleUpVoteComment = (threadId, commentId) => {
    dispatch(asyncUpVoteComment(threadId, commentId));
  };

  const handleDownVoteComment = (threadId, commentId) => {
    dispatch(asyncDownVoteComment(threadId, commentId));
  };

  const handleNeutralizeVoteComment = (threadId, commentId) => {
    dispatch(asyncNeutralVoteComment(threadId, commentId));
  };

  const handleVote = {
    handleUpVoteComment,
    handleDownVoteComment,
    handleNeutralizeVoteComment,
  };

  const commentsList = detailThread?.comments?.map((comment) => ({
    ...comment,
    thread: id,
  }));

  return (
    <>
      <Loading />
      <div className="detail-page">
        <div className="thread-detail">
          <ThreadDetail {...detailThread} />
          <ThreadCommentInput onComment={onComment} authUser={authUser} />
        </div>
        <ThreadCommentList
          key={detailThread.id}
          comments={commentsList}
          handleVote={handleVote}
          authUser={authUser}
        />
      </div>
    </>
  );
}

export default DetailPage;

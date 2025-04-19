import React from 'react';
import ThreadInput from '../components/ThreadInput';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAddThread } from '../states/threads/action';

function CreatePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);

  if (!authUser) {
    return navigate('/login');
  }

  const handleCreateThread = ({ title, category, body }) => {
    dispatch(asyncAddThread({ title, category, body }));
    navigate('/');
  };

  return (
    <div className="create-page">
      <h2 className="create-title">Buat Thread Baru</h2>
      <ThreadInput onCreate={handleCreateThread} />
    </div>
  );
}

export default CreatePage;

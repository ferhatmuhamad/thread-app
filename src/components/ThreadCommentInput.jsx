import React from 'react';
import useInput from '../hooks/useInput';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from './Button';

function ThreadCommentInput({ onComment }) {
  const [content, onContentChange, setContent] = useInput('');
  const authUser = useSelector((state) => state.authUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onComment(content);
    setContent('');
  };

  if (!authUser) {
    return (
      <div className="comment-input">
        <p className="comment-input-placeholder">
          Silakan <Link to={'/login'}>Login</Link> untuk menulis komentar
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        placeholder="Tulis komentar..."
        value={content}
        onChange={onContentChange}
        className="comment-textarea"
        required
      ></textarea>
      <Button type="submit" variant="secondary">
        Kirim
      </Button>
    </form>
  );
}

ThreadCommentInput.propTypes = {
  onComment: PropTypes.func.isRequired,
};

export default ThreadCommentInput;

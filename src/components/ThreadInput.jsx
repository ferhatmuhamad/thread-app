import React from 'react';
import useInput from '../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ThreadInput({ onCreate }) {
  const [title, onTitleChange, setTitle] = useInput('');
  const [category, onCategoryChange, setCategory] = useInput('');
  const [body, onBodyChange, setBody] = useInput('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ title, category, body });
    setTitle('');
    setCategory('');
    setBody('');
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="thread-form">
      <label className="form-label">Judul</label>
      <input
        type="text"
        className="form-input"
        placeholder="Contoh: Pendapat tentang fitur baru..."
        value={title}
        onChange={onTitleChange}
        required
      />

      <label className="form-label">Category</label>
      <input
        type="text"
        className="form-input"
        placeholder="Contoh: React..."
        value={category}
        onChange={onCategoryChange}
        required
      />

      <label className="form-label">Isi Thread</label>
      <textarea
        className="form-textarea"
        placeholder="Tulis isi thread kamu di sini..."
        value={body}
        onChange={onBodyChange}
        required
      ></textarea>

      <button type="submit" className="form-button">
        Buat Thread
      </button>
    </form>
  );
}

ThreadInput.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default ThreadInput;

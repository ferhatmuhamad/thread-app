import React from 'react';
import LoginInput from '../components/LoginInput';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    const response = await dispatch(asyncSetAuthUser({ email, password }));
    if (!response.success) {
      return;
    }
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login, And Make Thread!</h2>
        <LoginInput onLogin={handleLogin} />
        <p>
          Don&apos;t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

import React from 'react';
import RegisterInput from '../components/RegisterInput';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../states/authUser/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));

    navigate('/login');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Register</h2>
        <RegisterInput onRegister={handleRegister} />
        <p>
          Don&apos;t have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;

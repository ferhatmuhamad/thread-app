import React from 'react';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';
import Input from './Input';
import Button from './Button';

function LoginInput({ onLogin }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={onEmailChange}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={onPasswordChange}
        required
      />
      <Button type="submit" variant="primary">
        Login
      </Button>
    </form>
  );
}

LoginInput.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginInput;

import React from 'react';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';
import Input from './Input';
import Button from './Button';

function RegisterInput({ onRegister }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={onNameChange}
        required
      />
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
        Register
      </Button>
    </form>
  );
}

RegisterInput.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default RegisterInput;

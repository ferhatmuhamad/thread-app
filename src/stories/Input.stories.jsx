import React, { useState } from 'react';
import Input from '../components/Input';

const stories = {
  title: 'Input',
  component: Input,
  tags: ['autodocs'],
};

export default stories;

function InputStory(args) {
  const [value, setValue] = useState('');
  return (
    <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />
  );
}

const EmailInput = InputStory.bind({});
EmailInput.args = {
  type: 'email',
  placeholder: 'Enter your email',
};

const PasswordInput = InputStory.bind({});
PasswordInput.args = {
  type: 'password',
  placeholder: 'Enter your password',
};

const TextInput = InputStory.bind({});
TextInput.args = {
  type: 'text',
  placeholder: 'Enter your name',
};

export { EmailInput, PasswordInput, TextInput };

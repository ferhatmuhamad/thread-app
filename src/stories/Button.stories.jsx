import React from 'react';
import Button from '../components/Button';

const stories = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
};

export default stories;

function ButtonStory(args) {
  return <Button {...args} onClick={() => alert('Clicked!')} />;
}

const ButtonPrimary = ButtonStory.bind({});
ButtonPrimary.args = {
  variant: 'primary',
  children: 'Primary Button',
};

const ButtonSecondary = ButtonStory.bind({});
ButtonSecondary.args = {
  variant: 'secondary',
  children: 'Secondary Button',
};

const ButtonDanger = ButtonStory.bind({});
ButtonDanger.args = {
  variant: 'danger',
  children: 'Danger Button',
};

export { ButtonPrimary, ButtonSecondary, ButtonDanger };

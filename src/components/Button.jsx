import React from 'react';
import PropTypes from 'prop-types';
import '../styles/style.css';

function Button({ type = 'button', children, variant = 'primary', ...props }) {
  return (
    <button type={type} className={`btn btn-${variant}`} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'dicoding']),
};

export default Button;

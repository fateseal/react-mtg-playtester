import React from 'react';
import cx from 'classnames';

const Button = ({ children, label, link, ...rest }) => (
  <button
    className={cx('rmp--btn', {
      'rmp--btn--link': link
    })}
    {...rest}
  >
    {label || children}
  </button>
);

export default Button;

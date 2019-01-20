import React from 'react';
import PropTypes from 'prop-types';

import Button from './PlaytesterButton';

const NumberInput = ({
  onDecrement,
  onIncrement,
  value = 0,
  onChange,
  name
}) => (
  <div className="rmp--input-group">
    <Button size="sm" kind="light" label="-" onClick={onDecrement} />

    <input
      type="text"
      name={name}
      pattern="[0-9]*"
      size="sm"
      kind="light"
      value={value}
      maxLength={3}
      onChange={e => (e.target.validity.valid ? onChange(e) : f => f)}
      className="rmp--text-input"
      outline
    />

    <Button size="sm" kind="light" label="+" onClick={onIncrement} />
  </div>
);

NumberInput.prototype = {
  onDecrement: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default NumberInput;

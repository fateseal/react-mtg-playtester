import React from 'react';

import NumberInput from './NumberInput';

const GameValue = ({
  label,
  name,
  value,
  setGameValue,
  incrementGameValue,
  decrementGameValue
}) => (
  <div className="rmp--game-value">
    <label className="rmp--game-value-label">{label}</label>
    <NumberInput
      value={value}
      onChange={e => setGameValue(name, parseInt(e.target.value, 10))}
      onIncrement={e => incrementGameValue(name)}
      onDecrement={e => decrementGameValue(name)}
    />
  </div>
);

export default GameValue;

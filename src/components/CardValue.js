import React from 'react';

import NumberInput from './NumberInput';

const CardValue = ({
  id,
  label,
  name,
  value,
  decrementCardValue,
  incrementCardValue,
  setCardValue
}) => (
  <div className="rmp--card-value">
    <label className="rmp--label">{label}</label>
    <NumberInput
      value={value}
      onChange={e => setCardValue(id, name, e.target.value)}
      onIncrement={e => incrementCardValue(id, name)}
      onDecrement={e => decrementCardValue(id, name)}
    />
  </div>
);

export default CardValue;

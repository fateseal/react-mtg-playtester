import React from 'react';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';

import { usePlaytester } from '../use-playtester';

import { LIBRARY, HAND } from '../constants/zoneTypes';
import { getCardsByZone } from '../reducers/playtester';

const TutorDropdown = () => {
  const [state, { moveCard, shuffle }] = usePlaytester();
  const cards = getCardsByZone(state, LIBRARY);
  const items = uniqBy(cards, c => c.name);
  const getTotalByName = name => cards.filter(c => c.name === name).length;

  const handleChange = event => {
    moveCard({
      id: parseInt(event.target.value, 10),
      fromZone: LIBRARY,
      toZone: HAND
    });

    shuffle();
  };

  return (
    <select
      className="rmp--select tutor"
      onChange={handleChange}
      kind="light"
      value="choose"
    >
      <option value="choose" disabled>
        Search library...
      </option>
      {sortBy(items, 'name').map(({ name, id }) => (
        <option key={id} value={id}>
          {name} ({getTotalByName(name)})
        </option>
      ))}
    </select>
  );
};

export default TutorDropdown;

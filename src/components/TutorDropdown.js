import React, { Component } from 'react';
import { connect } from 'react-redux';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';

import { LIBRARY, HAND } from '../constants/zoneTypes';
import { getCardsByZone } from '../reducers/playtester';

import { moveCard, shuffle } from '../actions/playtesterActions';

class TutorDropdown extends Component {
  state = { value: 'choose' };

  handleChange = event => {
    const { moveCard, shuffle } = this.props;

    moveCard({
      id: parseInt(event.target.value, 10),
      fromZone: LIBRARY,
      toZone: HAND
    });

    shuffle();
  };

  render() {
    const { cards } = this.props;
    const items = uniqBy(cards, c => c.name);

    const getTotalByName = name => cards.filter(c => c.name === name).length;

    return (
      <select
        className="rmp--select tutor"
        onChange={this.handleChange}
        kind="light"
        value={this.state.value}
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
  }
}

const select = state => ({
  cards: getCardsByZone(state, LIBRARY)
});

const actions = {
  moveCard,
  shuffle
};

export default connect(select, actions)(TutorDropdown);

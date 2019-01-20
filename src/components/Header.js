import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  setGameValue,
  incrementGameValue,
  decrementGameValue
} from '../actions/playtesterActions';

import { getSandbox } from '../reducers/playtester';

import GameValue from './GameValue';

const Header = ({
  headerLeft,
  life,
  energy,
  poison,
  setGameValue,
  incrementGameValue,
  decrementGameValue
}) => (
  <header className="rmp--header">
    <div className="rmp--header-left">{headerLeft}</div>
    <div className="rmp--header-values">
      <GameValue
        label="Life"
        name="life"
        value={life}
        mr={3}
        {...{ setGameValue, incrementGameValue, decrementGameValue }}
      />
      <GameValue
        label="Poison"
        name="poison"
        value={poison}
        mr={3}
        {...{ setGameValue, incrementGameValue, decrementGameValue }}
      />
      <GameValue
        label="Energy"
        name="energy"
        value={energy}
        {...{ setGameValue, incrementGameValue, decrementGameValue }}
      />
    </div>
  </header>
);

Header.propTypes = {
  headerLeft: PropTypes.node,
  life: PropTypes.number.isRequired,
  poison: PropTypes.number.isRequired,
  energy: PropTypes.number.isRequired
};

const select = state => {
  const { life, turn, poison, energy } = getSandbox(state);

  return {
    life,
    turn,
    poison,
    energy
  };
};

const actions = {
  setGameValue,
  incrementGameValue,
  decrementGameValue
};

export default connect(select, actions)(Header);

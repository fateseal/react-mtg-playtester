import React from 'react';
import PropTypes from 'prop-types';

import { usePlaytester } from '../use-playtester';
import GameValue from './GameValue';

const Header = ({ headerLeft }) => {
  const [
    { life, energy, poison },
    { setGameValue, incrementGameValue, decrementGameValue }
  ] = usePlaytester();

  return (
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
};

Header.propTypes = {
  headerLeft: PropTypes.node
};

export default Header;

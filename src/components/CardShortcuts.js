import React from 'react';
import { Shortcuts } from 'react-shortcuts';

import { usePlaytester } from '../use-playtester';

import { CARD_MODAL } from '../constants/modalTypes';
import * as zoneTypes from '../constants/zoneTypes';

const getMoveToZone = action => {
  const zones = {
    MOVE_TO_GRAVEYARD: zoneTypes.GRAVEYARD,
    MOVE_TO_EXILE: zoneTypes.EXILE,
    MOVE_TO_HAND: zoneTypes.HAND,
    MOVE_TO_BATTLEFIELD: zoneTypes.BATTLEFIELD,
    MOVE_TO_LIBRARY_TOP: zoneTypes.LIBRARY
  };

  if (action === 'MOVE_TO_LIBRARY_BOTTOM') {
    return {
      toBottom: true,
      toZone: zoneTypes.LIBRARY
    };
  }

  if (zones[action]) {
    return {
      toZone: zones[action]
    };
  }
};

const CardShortcuts = ({ id, zone, children }) => {
  const [
    state,
    {
      toggleTap,
      moveCard,
      openModal,
      setCardModalId,
      incrementCardValue,
      decrementCardValue
    }
  ] = usePlaytester();

  const handleShortcuts = (action, event) => {
    const inc = name => incrementCardValue(id, name);
    const dec = name => decrementCardValue(id, name);

    const actions = {
      OPEN_MODAL: () => {
        setCardModalId(id);
        openModal(CARD_MODAL);
      },
      TOGGLE_TAP: () => toggleTap(id),
      INC_POW: () => inc('power'),
      DEC_POW: () => dec('power'),
      INC_TOU: () => inc('toughness'),
      DEC_TOU: () => dec('toughness'),
      INC_COUNTERS: () => inc('counters'),
      DEC_COUNTERS: () => dec('counters')
    };

    if (actions[action]) {
      return actions[action]();
    }

    const moveConfig = getMoveToZone(action);

    moveCard({
      id,
      fromZone: zone,
      ...moveConfig
    });
  };

  return (
    <Shortcuts name="Card" handler={handleShortcuts}>
      {children}
    </Shortcuts>
  );
};

export default CardShortcuts;

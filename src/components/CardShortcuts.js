import React, { Component } from 'react';
import { Shortcuts } from 'react-shortcuts';
import { connect } from 'react-redux';

import { CARD_MODAL } from '../constants/modalTypes';
import * as zoneTypes from '../constants/zoneTypes';
import {
  toggleTap,
  moveCard,
  openModal,
  setCardModalId,
  incrementCardValue,
  decrementCardValue
} from '../actions/playtesterActions';

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

class CardShortcuts extends Component {
  handleShortcuts = (action, event) => {
    const {
      id,
      zone,
      moveCard,
      toggleTap,
      setCardModalId,
      openModal,
      incrementCardValue,
      decrementCardValue
    } = this.props;

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

  render() {
    return (
      <Shortcuts name="Card" handler={this.handleShortcuts}>
        {this.props.children}
      </Shortcuts>
    );
  }
}

const actions = {
  toggleTap,
  moveCard,
  openModal,
  setCardModalId,
  incrementCardValue,
  decrementCardValue
};

export default connect(null, actions)(CardShortcuts);

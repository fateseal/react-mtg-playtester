import React from 'react';
import { connect } from 'react-redux';

import {
  reset,
  untap,
  mulligan,
  shuffle,
  nextTurn,
  openModal
} from '../actions/playtesterActions';
import { SHORTCUTS_MODAL } from '../constants/modalTypes';

import Button from './PlaytesterButton';
import TutorDropdown from './TutorDropdown';

import { getPlaytester } from '../reducers/playtester';

const Footer = ({
  reset,
  mulligan,
  untap,
  shuffle,
  turn,
  nextTurn,
  openModal
}) => {
  return (
    <footer className="rmp--footer">
      <div className="rmp--footer-tips">
        <div>
          <Button
            icon="keyboard"
            label="Shortcuts"
            onClick={e => openModal(SHORTCUTS_MODAL)}
            link
          />
        </div>
      </div>
      <div className="rmp--footer-action-list">
        <div className="rmp--footer-action-item">
          <Button label="Restart" onClick={e => reset()} link />
        </div>
        <div className="rmp--footer-action-item">
          <TutorDropdown />
        </div>
        <div className="rmp--footer-action-item">
          <Button label="Mulligan" onClick={e => mulligan()} link />
        </div>
        <div className="rmp--footer-action-item">
          <Button label="Untap" onClick={e => untap()} link />
        </div>
        <div className="rmp--footer-action-item">
          <Button label="Shuffle" onClick={e => shuffle()} link />
        </div>
        <div className="rmp--footer-action-item">
          <Button label="Next turn" onClick={e => nextTurn()} />
        </div>
        <div className="rmp--footer-action-item">
          <span className="rmp--footer-turn">Currently turn {turn}</span>
        </div>
      </div>
    </footer>
  );
};

const select = state => ({
  turn: getPlaytester(state).turn
});

const actions = {
  shuffle,
  openModal,
  nextTurn,
  mulligan,
  reset,
  untap
};

export default connect(select, actions)(Footer);

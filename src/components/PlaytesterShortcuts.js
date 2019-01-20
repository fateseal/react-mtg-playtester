import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ShortcutManager, Shortcuts } from 'react-shortcuts';

import keymap from '../keymap';
import {
  reset,
  draw,
  shuffle,
  mulligan,
  nextTurn,
  untap,
  incrementGameValue,
  decrementGameValue,
  closeModal,
  openModal,
  tutor
} from '../actions/playtesterActions';
import { SHORTCUTS_MODAL } from '../constants/modalTypes';
import { isModalOpen } from '../reducers/playtester';

import ShortcutsModal from './ShortcutsModal';

const shortcutManager = new ShortcutManager(keymap);

class PlaytesterShortcuts extends Component {
  getChildContext() {
    return { shortcuts: shortcutManager };
  }

  toggleShortcutsModal = e => {
    const { isModalOpen, openModal, closeModal } = this.props;

    if (isModalOpen) {
      return closeModal();
    }

    openModal(SHORTCUTS_MODAL);
  };

  handleShortcuts = (action, event) => {
    const {
      untap,
      mulligan,
      draw,
      reset,
      shuffle,
      nextTurn,
      incrementGameValue,
      decrementGameValue,
      tutor
    } = this.props;

    // TODO: move the actions to a constants file, need to do same for keymap if so

    const appShortcuts = {
      RESET: () => reset(),
      SHUFFLE: () => shuffle(),
      INC_LIFE: () => incrementGameValue('life'),
      DEC_LIFE: () => decrementGameValue('life'),
      INC_POISON: () => incrementGameValue('poison'),
      DEC_POISON: () => decrementGameValue('poison'),
      NEXT_TURN: () => nextTurn(),
      DRAW_CARD: () => draw(),
      UNTAP: () => untap(),
      MULLIGAN: () => mulligan(),
      TOGGLE_SHORTCUTS_MODAL: () => this.toggleShortcutsModal(),
      TUTOR: () => tutor(),
      CLOSE_CARD_MODAL: () => closeModal()
    };

    if (appShortcuts[action]) {
      appShortcuts[action]();
    }
  };

  render() {
    const { isModalOpen, children } = this.props;

    return (
      <Shortcuts
        global
        // targetNodeSelector="main"
        name="Playtester"
        handler={this.handleShortcuts}
        alwaysFireHandler
      >
        {children}
        <ShortcutsModal
          isOpen={isModalOpen}
          onRequestClose={this.toggleShortcutsModal}
        />
      </Shortcuts>
    );
  }
}

PlaytesterShortcuts.childContextTypes = {
  shortcuts: PropTypes.object.isRequired
};

const select = state => ({
  isModalOpen: isModalOpen(state, SHORTCUTS_MODAL)
});

const actions = {
  reset,
  nextTurn,
  mulligan,
  draw,
  untap,
  shuffle,
  incrementGameValue,
  decrementGameValue,
  openModal,
  closeModal,
  tutor
};

const withConnect = connect(select, actions);

export default withConnect(PlaytesterShortcuts);

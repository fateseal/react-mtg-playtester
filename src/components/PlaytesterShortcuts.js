import React from 'react';
import PropTypes from 'prop-types';

import { ShortcutManager, Shortcuts } from 'react-shortcuts';

import { usePlaytester } from '../use-playtester';

import keymap from '../keymap';
import { SHORTCUTS_MODAL } from '../constants/modalTypes';

import ShortcutsModal from './ShortcutsModal';

const shortcutManager = new ShortcutManager(keymap);

const PlaytesterShortcuts = ({ children }) => {
  // getChildContext() { return { shortcuts: shortcutManager };
  // }

  const [
    { modal },
    {
      untap,
      mulligan,
      draw,
      reset,
      shuffle,
      nextTurn,
      incrementGameValue,
      decrementGameValue,
      tutor
    }
  ] = usePlaytester();

  const isModalOpen = modal === SHORTCUTS_MODAL;

  const toggleShortcutsModal = e => {
    if (isModalOpen) {
      return closeModal();
    }

    openModal(SHORTCUTS_MODAL);
  };

  const handleShortcuts = (action, event) => {
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
      TOGGLE_SHORTCUTS_MODAL: () => toggleShortcutsModal(),
      TUTOR: () => tutor(),
      CLOSE_CARD_MODAL: () => closeModal()
    };

    if (appShortcuts[action]) {
      appShortcuts[action]();
    }
  };

  return (
    <Shortcuts
      global
      // targetNodeSelector="main"
      name="Playtester"
      handler={handleShortcuts}
      alwaysFireHandler
    >
      {children}
      <ShortcutsModal
        isOpen={isModalOpen}
        onRequestClose={toggleShortcutsModal}
      />
    </Shortcuts>
  );
};

export default PlaytesterShortcuts;

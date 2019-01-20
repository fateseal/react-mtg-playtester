export const playtesterShortcuts = [
  {
    action: 'NEXT_TURN',
    keys: 'n',
    label: 'Next turn'
  },
  {
    action: 'DRAW_CARD',
    keys: 'd',
    label: 'Draw card'
  },
  {
    action: 'MULLIGAN',
    keys: 'm',
    label: 'Mulligan'
  },
  {
    action: 'SHUFFLE',
    keys: 's',
    label: 'Shuffle'
  },
  {
    action: 'RESET',
    keys: 'shift+r',
    label: 'Reset'
  },
  {
    action: 'UNTAP',
    keys: 'u',
    label: 'Untap'
  },
  {
    action: 'INC_LIFE',
    keys: 'l',
    label: 'Increment life'
  },
  {
    action: 'DEC_LIFE',
    keys: 'shift+l',
    label: 'Decrement life'
  },
  {
    action: 'INC_POISON',
    keys: 'p',
    label: 'Increment poison'
  },
  {
    action: 'DEC_POISON',
    keys: 'shift+p',
    label: 'Decrement poison'
  },
  {
    action: 'TOGGLE_SHORTCUTS_MODAL',
    keys: '?',
    label: 'Bring up this help dialog'
  },
  {
    action: 'TUTOR',
    keys: 'f',
    label: 'Tutor for a card'
  }
];

export const cardShortcuts = [
  {
    action: 'OPEN_MODAL',
    keys: 'space',
    label: 'Open details'
  },
  {
    action: 'TOGGLE_TAP',
    keys: 't',
    label: 'Tap or untap'
  },
  {
    action: 'MOVE_TO_BATTLEFIELD',
    keys: 'b',
    label: 'Move to battlefield'
  },
  {
    action: 'MOVE_TO_HAND',
    keys: 'h',
    label: 'Move to hand'
  },
  {
    action: 'MOVE_TO_LIBRARY_TOP',
    keys: 'y',
    label: 'Move to library top'
  },
  {
    action: 'MOVE_TO_LIBRARY_BOTTOM',
    keys: 'shift+y',
    label: 'Move to library bottom'
  },
  {
    action: 'MOVE_TO_GRAVEYARD',
    keys: 'g',
    label: 'Move to graveyard'
  },
  {
    action: 'MOVE_TO_EXILE',
    keys: 'x',
    label: 'Move to exile'
  },
  {
    action: 'INC_POW',
    keys: 'q',
    label: 'Increment power'
  },
  {
    action: 'DEC_POW',
    keys: 'shift+q',
    label: 'Decrement power'
  },
  {
    action: 'INC_TOU',
    keys: 'w',
    label: 'Increment toughness'
  },
  {
    action: 'DEC_TOU',
    keys: 'shift+w',
    label: 'Decrement toughness'
  },
  {
    action: 'INC_COUNTERS',
    keys: 'e',
    label: 'Increment counters'
  },
  {
    action: 'DEC_COUNTERS',
    keys: 'shift+e',
    label: 'Decrement counters'
  }
];

const createShortcuts = list =>
  list.reduce(
    (obj, shortcut) => ({
      ...obj,
      [shortcut.action]: shortcut.keys
    }),
    {}
  );

export default {
  Playtester: createShortcuts(playtesterShortcuts),
  Card: createShortcuts(cardShortcuts)
};

import React from 'react';

import { playtesterShortcuts, cardShortcuts } from '../keymap';

import Modal from './Modal';

const ShortcutItem = ({ label, keys }) => (
  <tr>
    <td className="rmp--shortcuts-keys">
      <kbd className="rmp--kbd">{keys}</kbd>
    </td>
    <td className="rmp--shortcuts-label">{label}</td>
  </tr>
);

const ShortcutTable = ({ head, items }) => (
  <table className="rmp--shortcuts-map">
    <thead>
      <tr>
        <th />
        <th className="rmp--shortcuts-title">{head} </th>
      </tr>
    </thead>
    <tbody>
      {items.map(item => <ShortcutItem key={item.action} {...item} />)}
    </tbody>
  </table>
);

const ShortcutsModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      title="Keyboard shortcuts"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <div className="rmp--shortcuts-modal">
        <div className="rmp--shortcuts-list">
          <ShortcutTable head="Global" items={playtesterShortcuts} />
        </div>
        <div className="rmp--shortcuts-list">
          <ShortcutTable head="Card" items={cardShortcuts} />
        </div>
      </div>
    </Modal>
  );
};

export default ShortcutsModal;

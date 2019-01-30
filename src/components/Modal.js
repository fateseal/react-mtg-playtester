import React from 'react';
import ReactModal from 'react-modal';

import { usePlaytester } from '../use-playtester';

// ReactModal.setAppElement('#react-mtg-playtester');

ReactModal.defaultStyles = {};

const Modal = ({ title, isOpen, onAfterOpen, closeTimeoutMS, children }) => {
  const [state, { closeModal }] = usePlaytester();

  return (
    <ReactModal
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={e => closeModal()}
      closeTimeoutMS={closeTimeoutMS}
      className="rmp--app-modal"
      overlayclassName="rmp--app-overlay"
    >
      <header className="rmp--modal-header">
        {title && <h2 className="rmp--modal-title" children={title} />}
        <button
          className="rmp--btn modal-close-btn"
          onClick={e => closeModal()}
        >
          Close &times;
        </button>
      </header>
      {children}
    </ReactModal>
  );
};

export default Modal;

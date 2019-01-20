import React from 'react';
import ReactModal from 'react-modal';

import { connect } from 'react-redux';
import { closeModal } from '../actions/playtesterActions';

// ReactModal.setAppElement('#react-mtg-playtester');

const Modal = ({
  dispatch,
  title,
  isOpen,
  onAfterOpen,
  closeTimeoutMS,
  children
}) => (
  <ReactModal
    isOpen={isOpen}
    onAfterOpen={onAfterOpen}
    onRequestClose={e => dispatch(closeModal())}
    closeTimeoutMS={closeTimeoutMS}
    className="rmp--app-modal"
    overlayclassName="rmp--app-overlay"
  >
    <header className="rmp--modal-header">
      {title && <h2 className="rmp--modal-title" children={title} />}
      <button
        className="rmp--btn modal-close-btn"
        onClick={e => dispatch(closeModal())}
      >
        Close &times;
      </button>
    </header>
    {children}
  </ReactModal>
);

export default connect()(Modal);

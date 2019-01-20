import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CARD_MODAL } from '../constants/modalTypes';
import {
  openModal,
  closeModal,
  moveCard,
  toggleTap,
  incrementCardValue,
  decrementCardValue,
  setCardValue
} from '../actions/playtesterActions';
import * as zoneTypes from '../constants/zoneTypes';
import { isModalOpen, getModalCard } from '../reducers/playtester';

import Modal from './Modal';
import Button from './PlaytesterButton';
import CardValue from './CardValue';

const zoneButtons = [
  {
    label: 'Battlefield',
    zone: zoneTypes.BATTLEFIELD
  },
  {
    label: 'Hand',
    zone: zoneTypes.HAND
  },
  {
    label: 'Library Top',
    zone: zoneTypes.LIBRARY
  },
  {
    label: 'Library Bottom',
    zone: zoneTypes.LIBRARY,
    toBottom: true
  },
  {
    label: 'Graveyard',
    zone: zoneTypes.GRAVEYARD
  },
  {
    label: 'Exile',
    zone: zoneTypes.EXILE
  }
];

class CardModal extends Component {
  handleTapToggle = () => {
    const { toggleTap, closeModal, card: { id } } = this.props;

    toggleTap(id);

    closeModal();
  };

  handleMoveCard = (toZone, toBottom) => {
    const { closeModal, moveCard, card, currentZone } = this.props;
    moveCard({
      id: card.id,
      fromZone: currentZone,
      toZone,
      toBottom
    });
    closeModal();
  };

  render() {
    const {
      isOpen,
      card,
      closeModal,
      currentZone,
      setCardValue,
      decrementCardValue,
      incrementCardValue
    } = this.props;

    return (
      <Modal title={card.name} isOpen={isOpen} onRequestClose={closeModal}>
        <div className="rmp--card-modal">
          <div className="rmp--card-modal-image">
            <img src={card.imageUrl} alt={card.name} />
          </div>
          <div className="rmp--card-modal-actions">
            <div className="rmp--card-modal-actions-item card-modal-move">
              <fieldset className="rmp--card-modal-fieldset">
                <legend className="rmp--label">Move to...</legend>
                <div>
                  <div className="rmp--btn-group">
                    {zoneButtons.map(({ label, zone, toBottom }) => (
                      <Button
                        key={label}
                        label={label}
                        onClick={e => this.handleMoveCard(zone, toBottom)}
                        disabled={zone === currentZone}
                      />
                    ))}
                  </div>
                </div>
              </fieldset>
            </div>

            <div className="rmp--card-modal-actions-item card-modal-values">
              <CardValue
                id={card.id}
                label="Power"
                name="power"
                value={card.power}
                incrementCardValue={incrementCardValue}
                decrementCardValue={decrementCardValue}
                setCardValue={setCardValue}
              />
              <CardValue
                id={card.id}
                label="Toughness"
                name="toughness"
                value={card.toughness}
                incrementCardValue={incrementCardValue}
                decrementCardValue={decrementCardValue}
                setCardValue={setCardValue}
              />
            </div>

            <div className="rmp--card-modal-actions-item card-modal-counters">
              <CardValue
                id={card.id}
                label="Counters"
                name="counters"
                value={card.counters}
                incrementCardValue={incrementCardValue}
                decrementCardValue={decrementCardValue}
                setCardValue={setCardValue}
              />
              <div className="rmp--card-modal-counter-btn">
                <Button
                  label="Add +1/+1 counter"
                  onClick={e => incrementCardValue(card.id, 'counters')}
                />
              </div>
              <div className="rmp--card-modal-counter-btn">
                <Button
                  label="Add -1/-1 counter"
                  onClick={e => decrementCardValue(card.id, 'counters')}
                />
              </div>
            </div>

            <div className="rmp--card-modal-actions-item card-modal-tap">
              <Button
                onClick={this.handleTapToggle}
                label={card.isTapped ? 'Untap' : 'Tap'}
                disabled={currentZone !== zoneTypes.BATTLEFIELD}
              />
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

CardModal.defaultProps = {
  card: {},
  zone: ''
};

const select = state => {
  const card = getModalCard(state);
  const isOpen = isModalOpen(state, CARD_MODAL);

  return {
    isOpen,
    currentZone: card && card.zone,
    card
  };
};

const actions = {
  closeModal,
  openModal,
  moveCard,
  toggleTap,
  decrementCardValue,
  incrementCardValue,
  setCardValue
};

export default connect(select, actions)(CardModal);

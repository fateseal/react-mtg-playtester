import React from 'react';

import { usePlaytester } from '../use-playtester';

import { CARD_MODAL } from '../constants/modalTypes';
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

const select = state => {
  const card = getModalCard(state);
  const isOpen = isModalOpen(state, CARD_MODAL);

  return {
    isOpen,
    currentZone: card && card.zone,
    card
  };
};

const CardModal = () => {
  const [
    state,
    {
      closeModal,
      moveCard,
      toggleTap,
      decrementCardValue,
      incrementCardValue,
      setCardValue
    }
  ] = usePlaytester();

  const { currentZone, isOpen, card = {} } = select(state);

  const handleTapToggle = () => {
    toggleTap(card.id);

    closeModal();
  };

  const handleMoveCard = (toZone, toBottom) => {
    moveCard({
      id: card.id,
      fromZone: currentZone,
      toZone,
      toBottom
    });
    closeModal();
  };

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
                      onClick={e => handleMoveCard(zone, toBottom)}
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
              onClick={handleTapToggle}
              label={card.isTapped ? 'Untap' : 'Tap'}
              disabled={currentZone !== zoneTypes.BATTLEFIELD}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CardModal;

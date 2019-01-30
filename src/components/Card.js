import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

import * as zoneTypes from '../constants/zoneTypes';
import { CARD_MODAL } from '../constants/modalTypes';

import CardShortcuts from './CardShortcuts';

import { usePlaytester } from '../use-playtester';

const CardStats = ({ counters, power, toughness }) => (
  <div className="rmp--card-stats">
    <span>{counters > 0 ? <span>{counters}c</span> : null}</span>
    {power > 0 || toughness > 0 ? (
      <span>
        {power}/{toughness}
      </span>
    ) : null}
  </div>
);

const Card = ({
  zone,
  id,
  imageUrl,
  name,
  cardBackUrl,
  isTapped,
  index,
  type,
  power,
  toughness,
  counters,
  style
}) => {
  const focusableElem = null;
  const cardRef = useRef(null);

  const [
    state,
    { toggleTap, moveCard, setCardModalId, openModal }
  ] = usePlaytester();

  useEffect(
    () => {
      // console.log(cardRef);
      // focusableElemRef = cardRef.querySelector('[tabindex]');
    },
    [cardRef]
  );

  const handleClick = e => {
    if (zone === zoneTypes.BATTLEFIELD) {
      return toggleTap(id);
    }

    if (zone === zoneTypes.LIBRARY) {
      return moveCard({
        id,
        fromZone: zone,
        toZone: zoneTypes.HAND
      });
    }

    if (zone === zoneTypes.HAND) {
      const toZone = type.match(/land/i)
        ? zoneTypes.LAND
        : zoneTypes.BATTLEFIELD;

      return moveCard({
        id,
        fromZone: zone,
        toZone
      });
    }
  };

  const handleMouseOut = e => {
    // focusableElem.blur();
  };

  const handleMouseOver = e => {
    // focusableElem.focus();
  };

  const handleOpenModal = () => {
    setCardModalId(id);
    openModal(CARD_MODAL);
  };

  const handleContextMenu = e => {
    e.preventDefault();
    handleOpenModal();
  };

  const renderCardImage = () => {
    const src = zone === zoneTypes.LIBRARY ? cardBackUrl : imageUrl;
    return <img src={src} alt={name} className="rmp--card-img" />;
  };

  const isBattlefield = zone === zoneTypes.BATTLEFIELD;
  const isHand = zone === zoneTypes.HAND;
  const isLand = zone === zoneTypes.LAND;

  const isStacked = !isBattlefield && !isHand && !isLand;

  const getStyles = (isDragging, itemStyles) => ({
    ...style,
    display: 'inline-block',
    maxWidth: 112,
    position: isStacked ? 'absolute' : 'relative',
    zIndex: isStacked ? index : 1000 - index,
    opacity: isDragging ? 0.5 : 1,
    transform: isBattlefield && isTapped ? 'rotate(90deg)' : 'none',
    transition: 'transform .2s',
    ...itemStyles
  });

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onContextMenu={handleContextMenu}
          style={getStyles(snapshot.isDragging, provided.draggableProps.style)}
          onClick={handleClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="rmp--card"
        >
          {/* <CardShortcuts id={id} zone={zone}> */}
          {renderCardImage()}
          {/* </CardShortcuts> */}
          {isBattlefield && (
            <CardStats
              power={power}
              toughness={toughness}
              counters={counters}
            />
          )}
        </li>
      )}
    </Draggable>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  zone: PropTypes.oneOf(zoneTypes.zoneNames).isRequired
};

export default Card;

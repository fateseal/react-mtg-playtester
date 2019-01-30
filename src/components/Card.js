import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

import * as zoneTypes from '../constants/zoneTypes';
import { CARD_MODAL } from '../constants/modalTypes';
import { CARD } from '../constants/itemTypes';

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
  connectDragSource,
  isDragging,
  isTapped,
  index,
  left,
  top,
  power,
  toughness,
  counters,
  offset,
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
      return moveCard({
        id,
        fromZone: zone,
        toZone: zoneTypes.BATTLEFIELD
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

  const sourceStyles = {
    ...style,
    marginLeft: isHand && index > 0 ? -offset : undefined,
    display: 'inline-block',
    maxWidth: 112,
    position: isHand ? 'relative' : 'absolute',
    left: isBattlefield ? left : undefined,
    top: isBattlefield ? top : undefined,
    zIndex: isBattlefield || isHand ? index : 1000 - index,
    opacity: isDragging ? 0.5 : 1,
    transform: isBattlefield && isTapped ? 'rotate(90deg)' : 'none',
    transition: 'transform .2s'
  };

  // wrapped in span to fix https://github.com/react-dnd/react-dnd/issues/998#issuecomment-435322873
  return connectDragSource(
    <span>
      <li
        ref={cardRef}
        onContextMenu={handleContextMenu}
        style={sourceStyles}
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className="rmp--card"
      >
        {/* <CardShortcuts id={id} zone={zone}> */}
        {renderCardImage()}
        {/* </CardShortcuts> */}
        {isBattlefield && (
          <CardStats power={power} toughness={toughness} counters={counters} />
        )}
      </li>
    </span>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  zone: PropTypes.oneOf(zoneTypes.zoneNames).isRequired
};

const cardSource = {
  beginDrag(props) {
    const { id, zone, left, top } = props;
    return { id, zone, left, top };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const withDragSource = DragSource(CARD, cardSource, collect);

export default withDragSource(Card);

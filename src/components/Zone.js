import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Droppable } from 'react-beautiful-dnd';

import { usePlaytester } from '../use-playtester';
import * as zoneTypes from '../constants/zoneTypes';
import { getCardsByZone } from '../reducers/playtester';
import Card from './Card';

const Zone = ({ name, cardBackUrl, cardWidth = 112 }) => {
  const [state, { moveCard }] = usePlaytester();
  const [isCardTextView, setIsTextView] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  // useEffect(() => {

  // const containerWidth = this._dropzone.offsetWidth;

  // }, [])

  const cards = getCardsByZone(state, name);

  const totalCards = cards.length;

  const totalCardsWidth = (totalCards + 1) * cardWidth;

  // const offset =
  //   totalCardsWidth > containerWidth
  //     ? Math.floor(totalCardsWidth - containerWidth) / totalCards
  //     : 0;

  return (
    <section className="rmp--zone">
      <header className="rmp--zone-header">
        <h2 className="rmp--zone-title">
          {name.toLowerCase()} ({cards.length})
        </h2>
      </header>
      <Droppable droppableId={name} direction="horizontal">
        {(provided, snapshot) => (
          <ul
            className={classnames('rmp--zone-box', {
              [`rmp--zone--${name.toLowerCase()}`]: true,
              'is-dropping': snapshot.isDraggingOver,
              'rmp--zone-box--text-view': isCardTextView
            })}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {cards.map((card, i) => (
              <Card
                key={card.id}
                id={card.id}
                type={card.type}
                index={i}
                toughness={card.toughness}
                power={card.power}
                counters={card.counters}
                zone={name}
                isTapped={card.isTapped}
                imageUrl={card.imageUrl}
                cardBackUrl={cardBackUrl}
                name={card.name}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </section>
  );
};

Zone.propTypes = {
  name: PropTypes.oneOf(zoneTypes.zoneNames).isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      card_id: PropTypes.object,
      zone: PropTypes.oneOf(zoneTypes.zoneNames)
    })
  ).isRequired
};

export default Zone;

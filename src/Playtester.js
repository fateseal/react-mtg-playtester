import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { DragDropContext } from 'react-beautiful-dnd';

import { usePlaytester } from './use-playtester';
import {
  BATTLEFIELD,
  HAND,
  LAND,
  LIBRARY,
  GRAVEYARD,
  EXILE,
  COMMAND
} from './constants/zoneTypes';

import Header from './components/Header';
import Footer from './components/Footer';
import Zone from './components/Zone';
import CardModal from './components/CardModal';

import PlaytesterShortcuts from './components/PlaytesterShortcuts';

const Playtester = ({ cards = [], commander, headerLeft, cardBackUrl }) => {
  const [
    { modal },
    { receiveCards, reset, receiveCommander, drawHand, moveCard }
  ] = usePlaytester();

  useEffect(() => {
    console.log('mounted', cards);
    receiveCards(cards);

    if (commander) {
      receiveCommander(commander);
    }

    reset();
    drawHand();
  }, []);

  const hasModal = !!modal;
  const isCommander = !!commander;

  const handleDragEnd = result => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    // TODO: allow sorting by changing index

    moveCard({
      id: result.draggableId,
      toZone: destination.droppableId,
      fromZone: source.droppableId,
      index: destination.index
    });
  };

  // <PlaytesterShortcuts>
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <section
        id="react-mtg-playtester"
        className={cx('rmp--app', {
          'has-modal': hasModal
        })}
      >
        <Header headerLeft={headerLeft} />
        <div className="rmp--app-battlefield">
          <Zone name={BATTLEFIELD} />
        </div>
        <div className="rmp--app-land">
          <Zone name={LAND} />
        </div>
        <div className="rmp--app-bottom">
          <div
            className={cx('rmp--app-bottom-zones', {
              'has-commander': isCommander
            })}
          >
            <div>
              <Zone name={HAND} />
            </div>
            <div>
              <Zone name={LIBRARY} cardBackUrl={cardBackUrl} />
            </div>
            <div>
              <Zone name={GRAVEYARD} />
            </div>
            <div>
              <Zone name={EXILE} />
            </div>
            {isCommander && (
              <div>
                <Zone name={COMMAND} />
              </div>
            )}
          </div>
        </div>
        <Footer />
        <CardModal />
      </section>
    </DragDropContext>
  );
  //  </PlaytesterShortcuts>
};

Playtester.propTypes = {
  cardBackUrl: PropTypes.string.isRequired,
  commander: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string
  }),
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      board: PropTypes.oneOf(['mainboard', 'sideboard']),
      quantity: PropTypes.number.isRequired,
      card_id: PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        power: PropTypes.string,
        toughness: PropTypes.string
      })
    })
  )
};

export default Playtester;

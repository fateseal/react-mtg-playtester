import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import cx from 'classnames';

import { usePlaytester } from './use-playtester';
import {
  BATTLEFIELD,
  HAND,
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
    { receiveCards, reset, receiveCommander, drawHand }
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

  // <PlaytesterShortcuts>
  return (
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

const withBackend = DragDropContext(HTML5Backend);

export default withBackend(Playtester);

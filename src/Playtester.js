import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import cx from 'classnames';

import {
  BATTLEFIELD,
  HAND,
  LIBRARY,
  GRAVEYARD,
  EXILE,
  COMMAND
} from './constants/zoneTypes';
import {
  reset,
  receiveCards,
  receiveCommander
} from './actions/playtesterActions';

import Header from './components/Header';
import Footer from './components/Footer';
import Zone from './components/Zone';
import CardModal from './components/CardModal';

import PlaytesterShortcuts from './components/PlaytesterShortcuts';

import { isModalOpen } from './reducers/playtester';

class Playtester extends Component {
  componentDidMount() {
    const {
      cards,
      commander,
      receiveCards,
      receiveCommander,
      reset
    } = this.props;

    receiveCards(cards);
    reset();

    if (commander) {
      receiveCommander(commander);
    }
  }

  render() {
    const { commander, headerLeft, isModalOpen, cardBackUrl } = this.props;

    const isCommander = !!commander;

    return (
      <PlaytesterShortcuts>
        <section
          id="react-mtg-playtester"
          className={cx('rmp--sandbox', {
            'has-modal': isModalOpen
          })}
        >
          <Header headerLeft={headerLeft} />
          <div className="rmp--sandbox-battlefield">
            <Zone name={BATTLEFIELD} />
          </div>
          <div className="rmp--sandbox-bottom">
            <div
              className={cx('rmp--sandbox-bottom-zones', {
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
      </PlaytesterShortcuts>
    );
  }
}

Playtester.propTypes = {
  cardBackUrl: PropTypes.string.isRequired,
  receiveCards: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
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

const select = state => ({
  isModalOpen: isModalOpen(state)
});

const actions = {
  receiveCards,
  receiveCommander,
  reset
};

const withConnect = connect(select, actions);

const withBackend = DragDropContext(HTML5Backend);

export default withConnect(withBackend(Playtester));

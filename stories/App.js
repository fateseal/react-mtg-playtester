import React, { Component } from 'react';
import Playtester from '../src';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import '../src/css/sandbox.css';
import data from './deck.json';
import cardback from './mtgcard-back.png';

import { reducer as sandboxReducer } from '../src';

const store = createStore(
  combineReducers({
    sandbox: sandboxReducer
  }),
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

const getCardsByBoard = (lib, board) => lib.filter(c => c.board === board);

const fillItems = (count, cb) =>
  Array(count)
    .fill()
    .map(cb);

const getPlaytesterCards = cards =>
  getCardsByBoard(cards, 'mainboard').reduce((arr, deckCard, i) => {
    const items = fillItems(deckCard.quantity, () => ({
      ...deckCard,
      name: deckCard.card.name,
      imageUrl: deckCard.card.url
    }));

    return [...arr, ...items];
  }, []);

class App extends Component {
  render() {
    const { format, cards, featuredCard } = data;

    const items = getPlaytesterCards(cards);

    const headerLeft = (
      <div style={{ color: 'white' }}>Link back to deck here</div>
    );

    return (
      <Provider store={store}>
        <Playtester
          headerLeft={headerLeft}
          cardBackUrl={cardback}
          cards={items}
          commander={format === 'Commander ' ? featuredCard : null}
        />
      </Provider>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Playtester from '../src';

import '../src/css/sandbox.css';
import data from './deck.json';
import cardback from './mtgcard-back.png';

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

    console.log(items);

    const headerLeft = (
      <div style={{ color: 'white' }}>Link back to deck here</div>
    );

    return (
      <Playtester
        headerLeft={headerLeft}
        cardBackUrl={cardback}
        cards={items}
        commander={format === 'Commander ' ? featuredCard : null}
      />
    );
  }
}

export default App;

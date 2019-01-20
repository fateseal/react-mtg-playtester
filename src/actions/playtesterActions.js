import * as types from '../constants/actionTypes';
import { HAND, LIBRARY, BATTLEFIELD, COMMAND } from '../constants/zoneTypes';

import { TUTOR_MODAL } from '../constants/modalTypes';

import { getSandbox } from '../reducers/playtester';

export function reset(resetMulligans = true) {
  return dispatch => {
    dispatch({
      type: types.RESET,
      resetMulligans
    });
    dispatch(shuffle());
    dispatch(drawHand());
  };
}

export function receiveCommander(card) {
  return (dispatch, getState) => {
    const { cardIds } = getSandbox(getState());

    const id = cardIds[cardIds.length - 1] + 1;

    const commander = {
      card,
      name: card.name,
      imageUrl: card.url,
      id,
      left: 0,
      top: 0,
      zone: COMMAND,
      counters: parseInt(card.loyalty, 10) || 0,
      power: parseInt(card.power, 10) || 0,
      toughness: parseInt(card.toughness, 10) || 0
    };

    dispatch({
      type: types.RECEIVE_COMMANDER,
      commander
    });
  };
}

export function receiveCards(deckCards = []) {
  return dispatch => {
    let cardIds = [];
    const cardsById = deckCards.reduce((obj, deckCard, i) => {
      cardIds.push(i);
      return {
        ...obj,
        [i]: {
          id: i,
          left: 0,
          top: 0,
          zone: LIBRARY,
          counters: parseInt(deckCard.card.loyalty, 10) || 0,
          power: parseInt(deckCard.card.power, 10) || 0,
          toughness: parseInt(deckCard.card.toughness, 10) || 0,
          ...deckCard
        }
      };
    }, {});

    dispatch({
      type: types.RECEIVE_CARDS,
      cardsById,
      cardIds
    });
  };
}

export function setCardValue(id, name, value) {
  return {
    type: types.SET_CARD_VALUE,
    id,
    name,
    value
  };
}

export function incrementCardValue(id, name) {
  return {
    type: types.INCREMENT_CARD_VALUE,
    id,
    name
  };
}

export function decrementCardValue(id, name) {
  return {
    type: types.DECREMENT_CARD_VALUE,
    id,
    name
  };
}

export function setGameValue(field, value) {
  return {
    type: types.SET_GAME_VALUE,
    field,
    value
  };
}

export function incrementGameValue(field) {
  return {
    type: types.INCREMENT_GAME_VALUE,
    field
  };
}

export function decrementGameValue(field) {
  return {
    type: types.DECREMENT_GAME_VALUE,
    field
  };
}

export function setCardModalId(id) {
  return {
    type: types.SET_CARD_MODAL_ID,
    id
  };
}

export function moveCard({
  id,
  fromZone,
  toZone,
  toBottom = false,
  left = 0,
  top = 0
}) {
  return (dispatch, getState) => {
    const cards = getSandbox(getState())[BATTLEFIELD];
    const offset = cards.length;

    left = left === 0 ? 50 * offset : left;

    dispatch({
      type: types.MOVE_CARD,
      id,
      fromZone,
      toZone,
      toBottom: toZone === HAND ? true : toBottom,
      untap: toZone !== BATTLEFIELD,
      left,
      top
    });
  };
}

export function shuffle() {
  return {
    type: types.SHUFFLE_LIBRARY
  };
}

export function draw() {
  return (dispatch, getState) => {
    const lib = getSandbox(getState())[LIBRARY];
    dispatch(
      moveCard({
        id: lib[0],
        fromZone: LIBRARY,
        toZone: HAND
      })
    );
  };
}

export function drawHand() {
  return (dispatch, getState) => {
    const { handSize, mulligans } = getSandbox(getState());
    const cardNum = handSize - mulligans;
    for (let i = 0; i < cardNum; i++) {
      dispatch(draw());
    }
  };
}

export function mulligan() {
  return (dispatch, getState) => {
    dispatch(incrementGameValue('mulligans'));
    dispatch(reset(false));
  };
}

export function toggleTap(id) {
  return {
    type: types.TOGGLE_TAP,
    id
  };
}

export function tapCard(id) {
  return {
    type: types.TAP_CARD,
    id
  };
}

export function untapCard(id) {
  return {
    type: types.UNTAP_CARD,
    id
  };
}

export function untap() {
  return (dispatch, getState) => {
    const cardIds = getSandbox(getState())[BATTLEFIELD];
    return cardIds.forEach(id => dispatch(untapCard(id)));
  };
}

export function nextTurn() {
  return dispatch => {
    dispatch(incrementGameValue('turn'));
    dispatch(untap());
    dispatch(draw());
  };
}

// roll
// flipCard

export function openModal(name) {
  return {
    type: types.OPEN_MODAL,
    name
  };
}

export function closeModal() {
  return {
    type: types.OPEN_MODAL
  };
}

export function tutor() {
  return openModal(TUTOR_MODAL);
}

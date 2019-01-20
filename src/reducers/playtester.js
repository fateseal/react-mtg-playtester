import shuffle from 'lodash/shuffle';

import * as types from '../constants/actionTypes';
import {
  BATTLEFIELD,
  HAND,
  LIBRARY,
  GRAVEYARD,
  EXILE,
  COMMAND
} from '../constants/zoneTypes';

import card from './card';

export const initialState = {
  life: 20,
  poison: 0,
  turn: 1,
  energy: 0,
  handSize: 7,
  mulligans: 0,
  modalCardId: 0,
  modal: null,
  isModalOpen: false,
  cardIds: [],
  cardsById: {},
  [BATTLEFIELD]: [],
  [HAND]: [],
  [LIBRARY]: [],
  [GRAVEYARD]: [],
  [EXILE]: [],
  [COMMAND]: []
};

const moveCard = (state, action) => {
  const { cardsById } = state;
  const { id, toBottom, fromZone, toZone } = action;

  const newCardsById = {
    ...cardsById,
    [id]: card(cardsById[id], action)
  };

  if (fromZone === toZone) {
    return {
      ...state,
      cardsById: newCardsById
    };
  }

  return {
    ...state,
    cardsById: newCardsById,
    [fromZone]: state[fromZone].filter(_id => _id !== id),
    [toZone]: toBottom ? [...state[toZone], id] : [id, ...state[toZone]]
  };
};

export default function playtester(state = initialState, action) {
  switch (action.type) {
    case types.RESET:
      return {
        ...initialState,
        mulligans: action.resetMulligans ? 0 : state.mulligans,
        // move all cards to library
        cardsById: Object.keys(state.cardsById).reduce(
          (obj, id) => ({
            ...obj,
            [id]: {
              ...state.cardsById[id],
              zone: LIBRARY
            }
          }),
          {}
        ),
        // put ids back since initial state overwrites the rest
        cardIds: state.cardIds,
        [LIBRARY]: state.cardIds
      };

    case types.OPEN_MODAL:
      return {
        ...state,
        modal: action.name
      };

    case types.CLOSE_MODAL:
      return {
        ...state,
        modal: null
      };

    case types.SET_GAME_VALUE:
      return {
        ...state,
        [action.field]: action.value
      };

    case types.INCREMENT_GAME_VALUE:
      return {
        ...state,
        [action.field]: state[action.field] + 1
      };

    case types.DECREMENT_GAME_VALUE:
      return {
        ...state,
        [action.field]: state[action.field] - 1
      };

    case types.SET_CARD_MODAL_ID:
      return {
        ...state,
        modalCardId: action.id
      };

    case types.RECEIVE_COMMANDER:
      return {
        ...state,
        cardIds: [...state.cardIds, action.commander.id],
        cardsById: {
          ...state.cardsById,
          [action.commander.id]: action.commander
        },
        [COMMAND]: [action.commander.id]
      };

    case types.RECEIVE_CARDS:
      return {
        ...state,
        [LIBRARY]: action.cardIds,
        cardsById: action.cardsById,
        cardIds: action.cardIds
      };

    case types.SHUFFLE_LIBRARY:
      return {
        ...state,
        [LIBRARY]: shuffle(state[LIBRARY])
      };

    case types.MOVE_CARD:
      return moveCard(state, action);

    case types.TOGGLE_TAP:
    case types.SET_CARD_VALUE:
    case types.INCREMENT_CARD_VALUE:
    case types.DECREMENT_CARD_VALUE:
    case types.TAP_CARD:
    case types.UNTAP_CARD:
      return {
        ...state,
        cardsById: {
          ...state.cardsById,
          [action.id]: card(state.cardsById[action.id], action)
        }
      };

    default:
      return state;
  }
}

export const getPlaytester = state => state.playtester;

export const getCardsByZone = (state, zone) => {
  const sb = getPlaytester(state);
  return sb[zone].map(id => sb.cardsById[id]);
};

export const getCardById = (state, id) => getPlaytester(state).cardsById[id];

export const getModalCard = state =>
  getCardById(state, getPlaytester(state).modalCardId);

export const isModalOpen = (state, modal) =>
  getPlaytester(state).modal === modal;

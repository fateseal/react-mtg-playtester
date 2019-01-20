import {
  MOVE_CARD,
  TAP_CARD,
  UNTAP_CARD,
  TOGGLE_TAP,
  INCREMENT_CARD_VALUE,
  DECREMENT_CARD_VALUE,
  SET_CARD_VALUE
} from '../constants/actionTypes';

const initialState = {
  id: null,
  name: null,
  imageUrl: null,
  zone: null,
  counters: 0,
  power: 0,
  toughness: 0,
  left: 0,
  top: 0,
  isTapped: false
};

export default function card(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_TAP:
      return {
        ...state,
        isTapped: !state.isTapped
      };

    case TAP_CARD:
      return {
        ...state,
        isTapped: true
      };

    case UNTAP_CARD:
      return {
        ...state,
        isTapped: false
      };

    case MOVE_CARD:
      return {
        ...state,
        zone: action.toZone,
        left: action.left,
        top: action.top
      };

    case SET_CARD_VALUE:
      return {
        ...state,
        [action.name]: parseInt(action.value, 10) || state[action.name]
      };

    case INCREMENT_CARD_VALUE:
      return {
        ...state,
        [action.name]: state[action.name] + 1
      };

    case DECREMENT_CARD_VALUE:
      return {
        ...state,
        [action.name]: state[action.name] - 1
      };

    default:
      return state;
  }
}

import * as types from '../../constants/actionTypes';
import { HAND, BATTLEFIELD, LIBRARY } from '../../constants/zoneTypes';
import reducer, { initialState } from '../playtester';

describe('playtester reducer', () => {
  it('inits with default state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('returns state if no action matches', () => {
    const state = {
      poison: 3
    };
    expect(reducer(state, {})).toEqual(state);
  });

  it('handles RESET without resetting mulligans', () => {
    const action = {
      type: types.RESET,
      resetMulligans: false
    };

    const state = {
      mulligans: 2,
      poison: 2,
      life: 25,
      cardIds: [],
      cardsById: {}
    };

    expect(reducer(state, action)).toEqual({
      ...initialState,
      mulligans: 2
    });
  });

  it('handles SET_GAME_VALUE', () => {
    const action = {
      type: types.SET_GAME_VALUE,
      field: 'life',
      value: 30
    };

    const state = {
      poison: 0,
      life: 20
    };
    expect(reducer(state, action)).toEqual({
      poison: 0,
      life: 30
    });
  });

  it('handles DECREMENT_GAME_VALUE', () => {
    const action = {
      type: types.DECREMENT_GAME_VALUE,
      field: 'life'
    };

    const state = {
      poison: 0,
      life: 20
    };
    expect(reducer(state, action)).toEqual({
      poison: 0,
      life: 19
    });
  });

  it('handles INCREMENT_GAME_VALUE', () => {
    const action = {
      type: types.INCREMENT_GAME_VALUE,
      field: 'life'
    };

    const state = {
      poison: 0,
      life: 20
    };
    expect(reducer(state, action)).toEqual({
      poison: 0,
      life: 21
    });
  });

  it('handles SET_GAME_VALUE', () => {
    const action = {
      type: types.SET_GAME_VALUE,
      field: 'life',
      value: 20
    };

    const state = {
      poison: 0,
      life: 0
    };
    expect(reducer(state, action)).toEqual({
      poison: 0,
      life: 20
    });
  });

  it('handles RECEIVE_CARDS', () => {
    const state = {
      cardsById: {},
      [LIBRARY]: []
    };

    const action = {
      type: types.RECEIVE_CARDS,
      cardsById: {
        1: {
          id: 1,
          board: 'mainboard',
          quantity: 3
        },
        2: {
          id: 2,
          board: 'mainboard',
          quantity: 4
        }
      },
      cardIds: [1, 2]
    };

    expect(reducer(state, action)).toEqual({
      cardIds: action.cardIds,
      cardsById: action.cardsById,
      [LIBRARY]: action.cardIds
    });
  });

  it('handles RESET by moving all cards to library', () => {
    const state = {
      ...initialState,
      cardIds: [1, 2],
      cardsById: {
        1: {
          zone: HAND
        },
        2: {
          zone: LIBRARY
        }
      },
      [LIBRARY]: [1, 2]
    };

    const action = {
      type: types.RESET
    };

    expect(reducer(state, action)).toEqual({
      ...initialState,
      cardIds: [1, 2],
      cardsById: {
        1: {
          zone: LIBRARY
        },
        2: {
          zone: LIBRARY
        }
      },
      [HAND]: [],
      [LIBRARY]: [1, 2]
    });
  });

  it('allows MOVE_CARD to the zone it came from', () => {
    const state = {
      cardsById: {
        1: {
          zone: BATTLEFIELD,
          left: 0,
          top: 0
        }
      },
      [BATTLEFIELD]: [1]
    };

    const action = {
      id: 1,
      type: types.MOVE_CARD,
      fromZone: BATTLEFIELD,
      toZone: BATTLEFIELD,
      left: 0,
      top: 0
    };

    expect(reducer(state, action)).toEqual({
      cardsById: {
        1: {
          zone: BATTLEFIELD,
          left: 0,
          top: 0
        }
      },
      [BATTLEFIELD]: [1]
    });
  });

  it('should handle MOVE_CARD', () => {
    const state = {
      cardsById: {
        1: {
          zone: HAND
        }
      },
      [HAND]: [1],
      [BATTLEFIELD]: []
    };

    const action = {
      type: types.MOVE_CARD,
      id: 1,
      fromZone: HAND,
      toZone: BATTLEFIELD
    };

    expect(reducer(state, action)).toEqual({
      cardsById: {
        1: {
          zone: BATTLEFIELD
        }
      },
      [HAND]: [],
      [BATTLEFIELD]: [1]
    });
  });

  it('should handle MOVE_CARD to bottom', () => {
    const state = {
      cardsById: {
        1: {
          zone: LIBRARY
        }
      },
      [LIBRARY]: [1, 2],
      [HAND]: [3]
    };
    const action = {
      type: types.MOVE_CARD,
      id: 1,
      toBottom: true,
      fromZone: LIBRARY,
      toZone: HAND
    };
    expect(reducer(state, action)).toEqual({
      cardsById: {
        1: {
          zone: HAND
        }
      },
      [LIBRARY]: [2],
      [HAND]: [3, 1]
    });
  });

  it('should handle TAP_CARD', () => {
    const state = {
      cardsById: {
        1: {
          id: 1,
          isTapped: false
        },
        2: {
          id: 2,
          isTapped: false
        }
      }
    };
    const action = {
      type: types.TAP_CARD,
      id: 1
    };
    expect(reducer(state, action)).toEqual({
      cardsById: {
        2: {
          id: 2,
          isTapped: false
        },
        1: {
          id: 1,
          isTapped: true
        }
      }
    });
  });
});

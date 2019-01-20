import * as types from '../../constants/actionTypes';
import reducer from '../card';

describe('reducers', () => {
  describe('card', () => {
    it('handles DECREMENT_CARD_VALUE', () => {
      const action = {
        type: types.DECREMENT_CARD_VALUE,
        id: 2,
        name: 'counters'
      };
      const state = {
        id: 2,
        counters: 2
      };
      expect(reducer(state, action)).toEqual({
        id: 2,
        counters: 1
      });
    });

    it('handles INCREMENT_CARD_VALUE', () => {
      const action = {
        type: types.INCREMENT_CARD_VALUE,
        id: 2,
        name: 'counters'
      };
      const state = {
        id: 2,
        counters: 3
      };
      expect(reducer(state, action)).toEqual({
        id: 2,
        counters: 4
      });
    });

    it('handles MOVE_CARD', () => {
      const action = {
        type: types.MOVE_CARD,
        id: 2,
        fromZone: 'LIBRARY',
        toZone: 'GRAVEYARD',
        left: 0,
        top: 0
      };
      const state = {
        id: 2,
        zone: 'LIBRARY'
      };
      expect(reducer(state, action)).toEqual({
        id: 2,
        zone: 'GRAVEYARD',
        left: 0,
        top: 0
      });
    });

    it('should handle TAP_CARD', () => {
      expect(
        reducer(
          {
            id: 1,
            isTapped: false
          },
          {
            type: types.TAP_CARD
          }
        )
      ).toEqual({
        id: 1,
        isTapped: true
      });
    });

    it('should handle UNTAP_CARD', () => {
      expect(
        reducer(
          {
            id: 1,
            isTapped: true
          },
          {
            type: types.UNTAP_CARD
          }
        )
      ).toEqual({
        id: 1,
        isTapped: false
      });
    });
  });
});

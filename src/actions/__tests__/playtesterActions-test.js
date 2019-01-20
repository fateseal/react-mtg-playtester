import * as actionTypes from '../../constants/actionTypes';
import * as zoneTypes from '../../constants/zoneTypes';
import * as actions from '../playtesterActions';

describe('playtesterActions', () => {
  describe('setGameValue', () => {
    it('returns a set game value action', () => {
      expect(actions.setGameValue('life', 4)).toEqual({
        type: actionTypes.SET_GAME_VALUE,
        field: 'life',
        value: 4
      });
    });
  });

  describe('shuffle', () => {
    it('returns shuffle action', () => {
      expect(actions.shuffle()).toEqual({
        type: actionTypes.SHUFFLE_LIBRARY
      });
    });
  });

  describe('untapCard', () => {
    it('returns an untap card action', () => {
      expect(actions.untapCard(3)).toEqual({
        type: actionTypes.UNTAP_CARD,
        id: 3
      });
    });
  });

  describe('moveCard', () => {
    it('moves a card to the bottom if it goes to hand', () => {
      const dispatch = jest.fn();
      const getState = () => ({
        sandbox: {
          [zoneTypes.BATTLEFIELD]: []
        }
      });

      const card = {
        id: 2,
        fromZone: zoneTypes.BATTLEFIELD,
        toZone: zoneTypes.HAND
      };

      actions.moveCard(card)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.MOVE_CARD,
        toBottom: true,
        left: 0,
        top: 0,
        untap: true,
        ...card
      });
    });

    it('untaps all cards unless its in the battlefield', () => {
      const dispatch = jest.fn();
      const getState = () => ({
        sandbox: {
          [zoneTypes.BATTLEFIELD]: []
        }
      });

      const card = {
        id: 2,
        fromZone: zoneTypes.BATTLEFIELD,
        toZone: zoneTypes.BATTLEFIELD
      };

      actions.moveCard(card)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.MOVE_CARD,
        toBottom: false,
        left: 0,
        top: 0,
        untap: false,
        ...card
      });
    });

    it('returns a move card thunk', () => {
      const dispatch = jest.fn();
      const getState = () => ({
        sandbox: { [zoneTypes.BATTLEFIELD]: [] }
      });

      const card = {
        id: 2,
        fromZone: zoneTypes.BATTLEFIELD,
        toZone: zoneTypes.LIBRARY
      };

      actions.moveCard(card)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.MOVE_CARD,
        toBottom: false,
        left: 0,
        top: 0,
        untap: true,
        ...card
      });
    });
  });
});

import { useContext } from 'react';

import { PlaytesterCtx } from './PlaytesterProvider';

import * as playtesterActions from './actions/playtesterActions';

const mapDispatchToActions = (dispatch, actions) => {
  return Object.keys(actions).reduce((obj, key) => {
    obj[key] = (...args) => dispatch(actions[key](...args));
    return obj;
  }, {});
};

export const usePlaytester = () => {
  const [state, dispatch] = useContext(PlaytesterCtx);

  const actionProps = mapDispatchToActions(dispatch, playtesterActions);

  return [state, actionProps];
};

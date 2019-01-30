import React, { createContext } from 'react';
import useEnhancedReducer from 'react-enhanced-reducer-hook';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const PlaytesterCtx = createContext({});

const PlaytesterProvider = ({ initialState = {}, reducer, children }) => {
  const middleware = [thunk, logger];

  const [state, dispatch] = useEnhancedReducer(
    reducer,
    initialState,
    middleware
  );

  return (
    <PlaytesterCtx.Provider value={[state, dispatch]}>
      {children}
    </PlaytesterCtx.Provider>
  );
};

export default PlaytesterProvider;

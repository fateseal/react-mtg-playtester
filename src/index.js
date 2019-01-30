import React from 'react';

import Playtester from './Playtester';
import PlaytesterProvider from './PlaytesterProvider';
import reducer, { initialState } from './reducers/playtester';

export default props => {
  return (
    <PlaytesterProvider reducer={reducer} initialState={initialState}>
      <Playtester {...props} />
    </PlaytesterProvider>
  );
};

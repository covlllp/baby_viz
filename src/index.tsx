import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { reducer } from 'data/reducer';

import { App } from 'container/app';

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...[thunk])),
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-content'),
);

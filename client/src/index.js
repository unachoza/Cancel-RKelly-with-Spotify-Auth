import React from 'react';
import ReactDOM from 'react-dom';
import App from 'Components/App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'Redux/store';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,

  document.getElementById('root')
);

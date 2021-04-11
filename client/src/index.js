import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import App from 'Components/App/App';

ReactDOM.render(<App />, document.querySelector('#root'));
=======
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
>>>>>>> ea6988ba74082d2e9516ebc19aaa80b6797c0dc3

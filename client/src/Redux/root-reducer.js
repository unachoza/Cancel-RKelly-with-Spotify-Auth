import { combineReducers } from 'redux';
import navigationReducer from 'Redux/navigation/navigation.reducers';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const rootReducer = combineReducers({
  navigation: navigationReducer,
});

export default persistReducer(persistConfig, rootReducer);

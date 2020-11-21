
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import Drawer from './Navigation/Drawer';
import Travel from './Navigation/Travel';
import { createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
///////////////REDUX////////////////////////
import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './redux/Reducers/index';
import { persistReducer, persistStore} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { createLogger } from 'redux-logger';
import { PersistGate } from 'redux-persist/integration/react';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist:['destinations','cart']
}

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const persistedReducer = persistReducer(persistConfig, reducers)
const store = createStoreWithMiddleware(persistedReducer);

const persistedStore = persistStore(store)

export default class App extends React.Component {
  render() {
    return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null} >
        <NavigationContainer>
          <Drawer />
        </NavigationContainer>
      </PersistGate>
     </Provider> 
    )
  } 

}
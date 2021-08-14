import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import reduxThunk from 'redux-thunk';
import firebase from '@firebase/app';

import Router from './Router';
import rootReducer from './reducers';


const firebaseConfig = {
    apiKey: "AIzaSyCuCCC03geUNIof4s72A8N_JspbcKWoL2Q",
    authDomain: "my-series-41bb0.firebaseapp.com",
    projectId: "my-series-41bb0",
    storageBucket: "my-series-41bb0.appspot.com",
    messagingSenderId: "1016289082537",
    appId: "1:1016289082537:web:d790598ba385b3f7c97db8",
    measurementId: "G-GTJQY0BRHL"
};

firebase.initializeApp(firebaseConfig);

const enhance = composeWithDevTools({
    realtime: true,
    host: 'localhost',
    port: 8000
});

const store = createStore(
    rootReducer, 
    enhance(applyMiddleware(reduxThunk))
);

const SeriesApp = props => (
    <Provider store={ store }>
        <Router />
    </Provider>
);

export default SeriesApp;
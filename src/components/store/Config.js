import { createStore, compose, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './reducers';

let reduxCompose = compose;

if(__DEV__){
    reduxCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} 

const configureStore = () => {
    return createStore(reducers, reduxCompose(applyMiddleware(promiseMiddleware)))
}

export default configureStore; 
import { compose, createStore, applyMiddleware } from 'redux';
import rootReducer from './combined-reducer';
import thunk from 'redux-thunk';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

export default store;
import { createStore, compose, applyMiddleware, Middleware } from 'redux';
import thunk from 'redux-thunk';
import { redirectMiddleware } from './middleawares/redirect.middleware';
import { rootReducer } from './rootReducer';
import { LoadingStatus } from './types';

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk, redirectMiddleware))
);

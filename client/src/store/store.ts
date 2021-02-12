import { createStore, compose, applyMiddleware, Middleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './rootReducer';
import { LoadingStatus } from './types';

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const syncMiddleWare: Middleware = store => next => action => {
	const syncActions = [ 'SET_ERROR'];
	
	if (syncActions.includes(action.type)) {
		const error = action.payload.response
		console.log(error);
	}

	if (action.type === 'SET_LOADING' && action.payload === LoadingStatus.ERROR) {
		console.log('error');
		
	}

	return next(action);
};

// const events = ['LOGIN_ACTION', 'FETCH_PRODUCT_ACTION', 'SET_ERROR', 'ALERT'];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk, syncMiddleWare,
		//  alertMiddleware(events)
		 ))
);

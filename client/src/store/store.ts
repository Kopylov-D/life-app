import { createStore, compose, applyMiddleware, Middleware } from 'redux';
import thunk from 'redux-thunk';
// import { syncData } from './ducks/todos/actions';
// import { alertMiddleware } from './middleaware/alert.middleware';
import { rootReducer } from './rootReducer';

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const syncMiddleWare: Middleware = store => next => action => {
	// console.log('Middleware triggered:', action);

	const syncActions = ['ADD_TASK_TO_CARD'];

	if (syncActions.includes(action.type)) {
		// store.dispatch()
	}

	return next(action);
};

const events = ['LOGIN_ACTION', 'FETCH_PRODUCT_ACTION', 'SET_ERROR', 'ALERT'];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk, syncMiddleWare,
		//  alertMiddleware(events)
		 ))
);

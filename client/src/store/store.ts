import { createStore, compose, applyMiddleware, Middleware } from 'redux';
import thunk from 'redux-thunk';
import { syncData } from './ducks/todos/actions';
import { rootReducer } from './rootReducer';

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const syncMiddleWare: Middleware = store => next => action => {
  // console.log('Middleware triggered:', action);

  const syncActions = ['ADD_TASK_TO_CARD']

  if (syncActions.includes(action.type)) {
    // store.dispatch(syncData())
    console.log('need sync');
    
  }
  
	return next(action);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk, syncMiddleWare))
);

import { combineReducers } from 'redux';
import { authReducer } from './ducks/auth/reducer';
import { budgetReducer } from './ducks/budget/reducer';
import { todosReducer } from './ducks/todos/reducer';
import { alertReducer } from './middleaware/alert.middleware';

export const rootReducer = combineReducers({
	auth: authReducer,
	budget: budgetReducer,
	todos: todosReducer,
	alert: alertReducer
});

export type RootState = ReturnType<typeof rootReducer>;

import { combineReducers } from 'redux';
import { authReducer } from './ducks/auth/reducer';
import { budgetReducer } from './ducks/budget/reducer';

export const rootReducer = combineReducers({
	auth: authReducer,
	budget: budgetReducer
});

export type RootState = ReturnType<typeof rootReducer>;

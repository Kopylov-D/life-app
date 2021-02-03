//reducer

import { Action, AnyAction, Dispatch, Middleware } from 'redux';
import { Icons } from '../../types';
import { syncData, syncDataWithout } from '../ducks/todos/actions';
import { TodosState } from '../ducks/todos/contracts/state';
import { RootState } from '../rootReducer';

//action

// export const showAlert = (payload: Alert): ShowAlertActionInterface => {

// };

//constants

// interface AlertSt{

// }

enum AlertActionTypes {
	SHOW_ALERT = 'SHOW_ALERT',
	HIDE_ALERT = 'HIDE_ALERT',
}

export interface AlertInterface {
	text: string;
  id: number;
  type?: 'error' | 'success' | 'warning'
  delay?: number;
  icon?: Icons
  action?(): void
	// notificationType: typeof AlertActionTypes;
}

export interface ShowAlertActionInterface extends Action<AlertActionTypes> {
	type: AlertActionTypes.SHOW_ALERT;
	payload: AlertInterface;
}

export interface HideAlertActionInterface extends Action<AlertActionTypes> {
	type: AlertActionTypes.HIDE_ALERT;
	payload: number;
}

//actionCreators

export const showAlert = (payload: AlertInterface): ShowAlertActionInterface => ({
	type: AlertActionTypes.SHOW_ALERT,
	payload,
});

export const hideAlert = (payload: number): HideAlertActionInterface => ({
	type: AlertActionTypes.HIDE_ALERT,
	payload,
});

type all = AlertActions | 

export const alertMiddleware = (events: any): Middleware<{}, any, Dispatch<AnyAction>> => ({
  dispatch,
  getState
}) => next => action => {
	if (events.includes(action.type)) {
    dispatch(showAlert(action.payload));
    
		action.payload.delay && setTimeout(() => {
			dispatch(hideAlert(action.payload.id));
		}, action.payload.delay);
  }
  
  if (action.type === 'ERROR' ) {

    // const todos: TodosState = getState().todos
    dispatch(syncData(action.payload))
  }

	return next(action);
};

type AlertActions = ShowAlertActionInterface | HideAlertActionInterface;

const initialState: AlertInterface[] = [];

export const alertReducer = (state = initialState, action: AlertActions) => {
	switch (action.type) {
		case AlertActionTypes.SHOW_ALERT: {
			return [...state, action.payload];
		}
		case AlertActionTypes.HIDE_ALERT: {
			return [...state].filter(n => n.id !== action.payload);
		}
		default:
			return state;
	}
};

export const selectAlerts = (state: RootState): AlertInterface[] => state.alert;

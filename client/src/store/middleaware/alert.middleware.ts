// //reducer

// import { Action, AnyAction, Dispatch, Middleware } from 'redux';
// import { Icons } from '../../types';
// import { syncData, syncDataWithout } from '../ducks/todos/actions';
// import { TodosState } from '../ducks/todos/contracts/state';
// import { RootState } from '../rootReducer';


// export enum AlertActionTypes {
// 	SHOW_ALERT = 'SHOW_ALERT',
// 	HIDE_ALERT = 'HIDE_ALERT',
// }



// export interface AlertPayloadInterface {
// 	text: string;
// 	type?: 'error' | 'success' | 'warning';
// 	delay?: number;
// 	icon?: Icons;
// 	action?(): void;
// }

// export interface AlertInterface extends AlertPayloadInterface{
// 	id: number;
// }

// export interface ShowAlertActionInterface extends Action<AlertActionTypes> {
// 	type: AlertActionTypes.SHOW_ALERT;
// 	payload: AlertPayloadInterface;
// }

// export interface HideAlertActionInterface extends Action<AlertActionTypes> {
// 	type: AlertActionTypes.HIDE_ALERT;
// 	payload: number;
// }

// //actionCreators

// export const showAlert = (payload: AlertInterface): ShowAlertActionInterface => ({
// 	type: AlertActionTypes.SHOW_ALERT,
// 	payload,
// });

// export const hideAlert = (payload: number): HideAlertActionInterface => ({
// 	type: AlertActionTypes.HIDE_ALERT,
// 	payload,
// });

// export const alertMiddleware = (
// 	events: any
// ): Middleware<{}, RootState, Dispatch<AnyAction>> => ({
// 	dispatch,
// 	getState,
// }) => next => action => {
// 	if (events.includes(action.type)) {
// 		const id = new Date().getTime()
// 		dispatch(showAlert({...action.payload, id}));

// 		action.payload.delay &&
// 			setTimeout(() => {
// 				dispatch(hideAlert(action.payload.id));
// 			}, action.payload.delay);
// 	}

// 	// dispatch(syncData(getState().todos))

// 	return next(action);
// };

// export type AlertActions = ShowAlertActionInterface | HideAlertActionInterface;

// const initialState: AlertInterface[] = [];

// export const alertReducer = (state = initialState, action: AlertActions) => {
// 	switch (action.type) {
// 		case AlertActionTypes.SHOW_ALERT: {
// 			return [...state, action.payload];
// 		}
// 		case AlertActionTypes.HIDE_ALERT: {
// 			return [...state].filter(n => n.id !== action.payload);
// 		}
// 		default:
// 			return state;
// 	}
// };

export const s = 1

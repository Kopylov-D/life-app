import { CommonActions, CommonActionTypes } from './contracts/actionTypes';
import { CommonState } from './contracts/state';

const initialState: CommonState = {
	alerts: [],
};

export const commonReducer = (state = initialState, action: CommonActions): CommonState => {
	switch (action.type) {
		case CommonActionTypes.SHOW_ALERT: {
			return {
         ...state, 
         alerts: [...state.alerts, action.payload] 
        };
		}
		case CommonActionTypes.HIDE_ALERT: {
			return {
				...state,
				alerts: state.alerts.filter(n => n.id !== action.payload),
			};
		}
		default:
			return state;
	}
};

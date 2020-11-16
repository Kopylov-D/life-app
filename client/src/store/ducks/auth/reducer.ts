import {
	AUTH_ERROR,
	AUTH_LOGOUT,
	// AUTH_RESTORE_SESSION,
	AUTH_START,
	AUTH_SUCCESS,
} from './actionTypes';

type InitialState = {
	isAuth: boolean,
	isLoading: boolean,
	authData?: {}
	errorMessage?: string | null
}

const initialState: InitialState = {
	isAuth: false,
	isLoading: false,
	authData: {},
	errorMessage: null
};

export const authReducer = (state = initialState, action: any): InitialState => {
	switch (action.type) {
		case AUTH_SUCCESS:
			return {
				...state,
				isAuth: true,
				isLoading: false,
				authData: action.authData,
				errorMessage: null
			};
		case AUTH_START:
			return {
				...state,
				isLoading: true,
			};
		// case AUTH_RESTORE_SESSION:
		// 	return {
		// 		...state,
		// 		authData: {
		// 			session: action.session,
		// 		},
		// 	};
		case AUTH_ERROR:
			return {
				...state,
				isLoading: false,
				errorMessage: action.errorMessage,
			};
		case AUTH_LOGOUT:
			return {
				...state,
				isAuth: false,
				authData: {},
			};
		default:
			return state;
	}
};

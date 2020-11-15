import {
	AUTH_START,
	AUTH_SUCCESS,
	AUTH_ERROR,
	// AUTH_LOGOUT,
} from './actionTypes';

// export const useHttp = () => {
// 	const [loading, setLoading] = useState<boolean>(false);
// 	const [error, setError] = useState<string| null>(null);

// 	const request = useCallback(
// 		async (url, method = 'GET', body = null, headers = {}) => {
// 			setLoading(true);
// 			try {
// 				if (body) {
// 					body = JSON.stringify(body);
// 					headers['Content-Type'] = 'application/json';
// 				}

// 				const response = await fetch(url, { method, body, headers });
// 				const data = await response.json();

// 				if (!response.ok) {
// 					throw new Error(data.message || 'Что-то пошло не так');
// 				}

// 				setLoading(false);

// 				return data;
// 			} catch (e) {
// 				setLoading(false);
// 				setError(e.message);
// 				throw e;
// 			}
// 		},
// 		[]
// 	);

// 	const clearError = useCallback(() => setError(null), []);

// 	return { loading, request, error, clearError };

type AuthData = {
	token: string;
	userId: string;
};

export function register(email: any, password: any) {
	return async (dispatch: any) => {
		dispatch(authStart());
		try {
			const user = {
				email,
				password,
			};
			console.log(user);
			const response = await fetch('/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user),
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Что-то пошло не так');
			}
			console.log('data', data);
			dispatch(authSuccess(data));
		} catch (e) {
			// throw new Error(e)
			console.log(e);

			// dispatch(authError(responseError));
		}
	};
}

export function login(email: any, password: any) {
	return async (dispatch: any) => {
		dispatch(authStart());
		try {
			const user = {
				email,
				password,
			};
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(user),
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Что-то пошло не так');
			}
			// console.log('loginData', data);
			dispatch(authSuccess(data));
		} catch (e) {
			console.log(e.name);
			dispatch(authError(e.message))
		}
	};
}

type authStartType = {
	type: typeof AUTH_START;
};

type authSuccessType = {
	type: typeof AUTH_SUCCESS;
	authData: AuthDataType;
};

type AuthErrorType = {
	type: typeof AUTH_ERROR,
	errorMessage: string
}

type AuthDataType = {
	message: string;
};

export function authStart(): authStartType {
	return {
		type: AUTH_START,
	};
}

export function authSuccess(authData: AuthDataType): authSuccessType {
	return {
		type: AUTH_SUCCESS,
		authData,
	};
}

export function authError(errorMessage: string): AuthErrorType {
	return {
		type: AUTH_ERROR,
		errorMessage,
	};
}

// export function autoLogin() {
// 	return async dispatch => {
// 		sendsay.setSessionFromCookie();
// 		const session = sendsey.session;
// 		const email = (document.cookie.match(`(^|; )sendsay_email=([^;]*)`) ||
// 			0)[2];
// 		const sublogin = (document.cookie.match(`(^|; )sendsay_sublogin=([^;]*)`) ||
// 			0)[2];

// 		if (session) {
// 			const authData = {
// 				session,
// 				email,
// 				sublogin,
// 			};
// 			dispatch(authSuccess(authData));
// 		} else {
// 			dispatch(logout());
// 		}
// 	};
// }

// export function logout() {
// 	document.cookie = `sendsay_session=; max-age=-1`;
// 	return {
// 		type: AUTH_LOGOUT,
// 	};
// }

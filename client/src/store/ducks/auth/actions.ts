import {
	AUTH_START,
	AUTH_SUCCESS,
	AUTH_ERROR,
	AUTH_LOGOUT,
} from './actionTypes';

type AuthData = {
	jwtToken: string;
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

			console.log(data);

			document.cookie = `jwtToken=${data.token}; max-age=36000`;
			document.cookie = `userId=${data.userId}; max-age=36000`;
			dispatch(authSuccess(data));
		} catch (e) {
			console.log(e);
			dispatch(authError(e.message));
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

			document.cookie = `jwtToken=${data.token}; max-age=36000`;
			document.cookie = `userId=${data.userId}; max-age=36000`;
			dispatch(authSuccess(data));
		} catch (e) {
			dispatch(authError(e.message));
		}
	};
}

export function autoLogin() {
	return async (dispatch: any) => {
		const jwtTokenCookie: RegExpMatchArray | null = document.cookie.match(
			`(^|; )jwtToken=([^;]*)`
		);
		const userIdCookie: RegExpMatchArray | null = document.cookie.match(
			`(^|; )userId=([^;]*)`
		);

		if (jwtTokenCookie) {
			const jwtToken = jwtTokenCookie[2];
			const userId = userIdCookie![2];

			const authData: AuthData = {
				jwtToken,
				userId,
			};

			dispatch(authSuccess(authData));
		} else {
			dispatch(logout());
		}
	};
}

export function logout() {
	document.cookie = `jwtToken=; max-age=-1`;
	document.cookie = `userId=; max-age=-1`;
	return {
		type: AUTH_LOGOUT,
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
	type: typeof AUTH_ERROR;
	errorMessage: string;
};

type AuthDataType = {
	message?: string;
	jwtToken?: string | null;
	userId?: string;
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

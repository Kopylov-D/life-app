import axios, { AxiosInstance } from 'axios';
import { setLogout } from '../../store/ducks/auth/actionCreators';
import { store } from '../../store/store';

export const getAuthData = () => {
	const jwtTokenCookie: RegExpMatchArray | null = document.cookie.match(
		`(^|; )jwtToken=([^;]*)`
	);
	const userIdCookie: RegExpMatchArray | null = document.cookie.match(
		`(^|; )userId=([^;]*)`
	);

	if (jwtTokenCookie) {
		const token: string = jwtTokenCookie[2];
		const userId: string = userIdCookie![2];

		return {
			token,
			userId,
		};
	}
	return {
		token: null,
		userId: null,
	};
};

export const instance: AxiosInstance = axios.create();

instance.interceptors.request.use(config => {
	const token = getAuthData().token;
	config.headers['Authorization'] = `Bearer ${token}`;
	return config;
});

instance.interceptors.response.use(
	config => {
		return config;
	},
	error => {
		if (error.response.status === 401) {
			store.dispatch(setLogout());
		}
		return Promise.reject(error);
	}
);

export interface Response<T> {
	message: string;
	data: T;
}
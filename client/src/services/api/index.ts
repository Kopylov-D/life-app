import axios, { AxiosInstance } from 'axios';

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
	config.headers['Authorization'] = `Bearer ${getAuthData().token}`;
	return config;
});

export interface Response<T> {
	message: string;
	data: T;
}

// export const {jwtToken} = getAuthData()

// const instance = axios.create({
// 	headers: {
// 		"Authorization": `Bearer ${getAuthData().jwtToken}`
// }
// })

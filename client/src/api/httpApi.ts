import axios from 'axios';

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

axios.interceptors.request.use(config => {
	config.headers['Authorization'] = `Bearer ${getAuthData().token}`;
	return config;
});

// Сделать классом
export const api = {
	register: (email: string, password: string): any =>
		axios
			.post('/api/auth/register', {
				email,
				password,
			})
			.catch(e => {
				throw new Error(e.response.data.message || 'Что-то пошло не так');
			}),

	login: (email: string, password: string): any =>
		axios
			.post('/api/auth/login', {
				email,
				password,
			})
			.catch(e => {
				throw new Error(e.response.data.message || 'Что-то пошло не так');
			}),

	getUser: () =>
		axios
			.get('/api/budget/info')
			.then(res => res.data.user)
			.catch(e => {
				throw new Error(e.response.data.message || 'Что-то пошло не так');
			}),

	addTransaction: (): any =>
		axios
			.get('/api/budget/tr')
			.then(res => res)
			.catch(e => {
				throw new Error(e.response.data.message || 'Что-то пошло не так');
			}),
};

// export const {jwtToken} = getAuthData()

// const instance = axios.create({
// 	headers: {
// 		"Authorization": `Bearer ${getAuthData().jwtToken}`
// }
// })

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

	getUser: () => axios.get('/api/budget/info'),
	// .then(res => res.data.user)
	// .catch(e => {
	// 	throw new Error(e.response.data.message || 'Что-то пошло не так');
	// }),

	addTransaction: (id: string, amount: number, date: Date | Date[] | undefined): any =>
		axios
			.post('/api/budget/transactions', {
				id,
				amount,
				date
			})
			// .then(res => res)
			.catch(e => {
				throw new Error(e.response.data.message || 'Что-то пошло не так');
			}),

	deleteTransaction: (_id: string): any => axios.delete(`api/budget/transactions/${_id}`),

	fetchBudgetData: (year: number, month: number) => axios.get(`/api/budget?year=${year}&month=${month}`),

	getCategories: () =>
		axios.get('/api/budget/transactions/get').catch(e => {
			throw new Error(e.response.data.message || 'Что-то пошло не так');
		}),

	addCategory: (): any => axios.post('/api/budget/categories'),

	changeCategory: (_id: string, name: string, color: string) =>
		axios.patch(`api/budget/categories/${_id}`, {
			name,
			color,
		}),

	deleteCategory: (_id: string): any => axios.delete(`api/budget/categories/${_id}`),
};

// export const {jwtToken} = getAuthData()

// const instance = axios.create({
// 	headers: {
// 		"Authorization": `Bearer ${getAuthData().jwtToken}`
// }
// })

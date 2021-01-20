import { instance as axios } from './index';

type LoginResponseType = {
	token?: string;
	userId?: string;
	message?: string;
	errors?: Array<string>;
};

export const authApi = {
	register: (email: string, password: string) =>
		axios
			.post('/api/auth/register', {
				email,
				password,
			})
			.catch(e => {
				throw new Error(e.response.data.message || 'Что-то пошло не так');
			}),

	login: (email: string, password: string) =>
		axios
			.post<LoginResponseType>('/api/auth/login', {
				email,
				password,
			})
			.catch(e => {
				throw new Error(e.response.data.message || 'Что-то пошло не так');
			}),
};

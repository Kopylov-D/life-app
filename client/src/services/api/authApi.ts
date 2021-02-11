import { AuthDataInterface } from '../../store/ducks/auth/contracts/state';
import { instance as axios } from './index';
import { Response } from './index';

type LoginResponseType = {
	token?: string;
	userId?: string;
	message?: string;
	errors?: Array<string>;
};

export const authApi = {
	register: (email: string, password: string) =>
		axios
			.post<Response<string>>('/api/auth/register', {
				email,
				password,
			})
			.then(res => res.data)
			.catch(e => {
				throw new Error(e.response.data.message || 'Что-то пошло не так');
			}),

	login: (email: string, password: string) =>
		axios
			.post<Response<LoginResponseType>>('/api/auth/login', {
				email,
				password,
			})
			.then(res => res.data)
			.catch(e => {
				throw new Error(e.response.data.message || 'Что-то пошло не так');
			}),
};

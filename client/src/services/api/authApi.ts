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
			.then(res => res.data),

	login: (email: string, password: string) =>
		axios
			.post<Response<LoginResponseType>>('/api/auth/login', {
				email,
				password,
			})
			.then(res => res.data),
};

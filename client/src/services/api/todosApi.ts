import { instance as axios, Response } from './index';
import {
	TodosDataInterface,
	TargetInterface,
	TaskInterface,
} from '../../store/ducks/todos/contracts/state';

export const todosApi = {
	getTodosData: () =>
		axios.get<Response<TodosDataInterface>>('/api/todos').then(res => res.data),

	addTask: (name: string) => axios.post('/api/todos/tasks', { name }),

	addTarget: (name: string) =>
		axios
			.post<Response<TargetInterface>>('/api/todos/targets', { name })
			.then(res => res.data),

	fetchTargets: () =>
		axios.get<TargetInterface[]>('/api/todos/targets').then(res => res.data),

	getTasks: () =>
		axios.get<Response<TaskInterface[]>>('/api/todos/tasks').then(res => res.data),
};

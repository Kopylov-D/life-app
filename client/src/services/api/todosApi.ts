import { instance as axios, Response } from './index';
import {
	TodosDataInterface,
	TargetInterface,
	TaskInterface,
	SubtaskInterface,
	CardInterface,
	TodosState,
} from '../../store/ducks/todos/contracts/state';
import Subtask from '../../components/Todos/Board/Subtask';

export const todosApi = {
	getTodosData: () =>
		axios.get<Response<TodosDataInterface>>('/api/todos').then(res => res.data),

	syncData: (todos: TodosState) => axios.patch('/api/todos', {...todos}).then(res => res.data),

	addTask: (
		task: TaskInterface
		// name: string,
		// target?: string,
		// notes?: string,
		// color?: string,
		// priority?: string,
		// subtask?: string,
		// level?: number
	) =>
		axios
			.post<Response<TaskInterface>>('/api/todos/tasks', {
				// name,
				// target,
				// notes,
				// color,
				// priority,
				// subtask,
				// level
				...task,
				_id: null
			})
			.then(res => res.data),

	updateTask: (
		task: TaskInterface
		// id: string,
		// isDone?: boolean,
		// name?: string,
		// target?: string,
		// notes?: string,
		// color?: string,
		// priority?: string
	) =>
		axios
			.patch<Response<TaskInterface>>(`/api/todos/tasks/${task._id}`, {
				...task
				// name,
				// isDone,
				// target,
				// notes,
				// color,
				// priority,
			})
			.then(res => res.data),

	deleteTask: (id: string) =>
		axios.delete<Response<string>>(`/api/todos/tasks/${id}`).then(res => res.data),

	addTarget: (name: string) =>
		axios
			.post<Response<TargetInterface>>('/api/todos/targets', { name })
			.then(res => res.data),

	updateTarget: (
		id: string,
		name?: string,
		isDone?: boolean,
		notes?: string,
		color?: string
	) =>
		axios
			.patch<Response<TargetInterface>>(`/api/todos/targets/${id}`, {
				name,
				isDone,
				notes,
				color,
			})
			.then(res => res.data),

	deleteTarget: (id: string) =>
		axios.delete<Response<string>>(`/api/todos/targets/${id}`).then(res => res.data),

	addSubtask: (name: string, task: string, level: number, target: string | null) =>
		axios
			.post<Response<SubtaskInterface>>('/api/todos/subtasks', {
				name,
				task,
				target,
				level,
			})
			.then(res => res.data),

	addCard: (level: number) =>
		axios
			.post<Response<CardInterface>>('/api/todos/cards', {
				level,
			})
			.then(res => res.data),

	fetchTargets: () =>
		axios.get<TargetInterface[]>('/api/todos/targets').then(res => res.data),

	getTasks: () =>
		axios.get<Response<TaskInterface[]>>('/api/todos/tasks').then(res => res.data),

	updateCard: (id: string, name: string, color?: string) =>
		axios
			.patch<Response<CardInterface>>(`/api/todos/cards/${id}`, { name })
			.then(res => res.data),

	deleteCard: (id: string) =>
		axios.delete<Response<string>>(`/api/todos/cards/${id}`).then(res => res.data),
};

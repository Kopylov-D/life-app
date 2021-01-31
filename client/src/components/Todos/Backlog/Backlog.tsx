import React, { useState } from 'react';
import Modal from '../../UI/Modal';
import Table from '../../Table';
import Button from '../../UI/Button';
import Target from './Target';
import { useInput } from '../../../hooks/input.hook';
import Input from '../../UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchAddTarget,
	fetchAddTask,
	fetchDeleteTarget,
	fetchDeleteTask,
	updateTarget,
	updateTask,
} from '../../../store/ducks/todos/actions';
import { selectTargets, selectTasks } from '../../../store/ducks/todos/selectors';
import BacklogTask from './BacklogTask';
import TaskEditor from './TaskEditor';
import { TaskInterface } from '../../../store/ducks/todos/contracts/state';

interface Props {}

const Backlog: React.FC<Props> = props => {
	const dispatch = useDispatch();

	const targets = useSelector(selectTargets);
	const tasks = useSelector(selectTasks);

	const [addTargetModalIsOpen, setAddTargetModalIsOpen] = useState<boolean>(false);
	const [taskEditorIsOpen, setTaskEditorIsOpen] = useState<boolean>(false);
	// const [changeTargetModalIsOpen, setChangeTargetModalIsOpen] = useState<boolean>(false);

	const addTargetInput = useInput(
		{ initialValue: '' },
		{ required: true, maxLength: 30 }
	);

	// const changeTargetInput = useInput(
	// 	{ initialValue:  ''},
	// 	{ required: true, maxLength: 30 }
	// );

	const addTargetHandler = () => {
		setAddTargetModalIsOpen(true);
	};

	const deleteTargetHandler = (id: string) => {
		dispatch(fetchDeleteTarget(id));
	};

	const changeTargetHandler = (
		id: string,
		name: string,
		notes: string,
		isDone: boolean
	) => {
		dispatch(updateTarget(id, name, notes, isDone));
	};

	const createTargetHandler = () => {
		dispatch(fetchAddTarget(addTargetInput.value));
		setAddTargetModalIsOpen(true);
	};

	const createTaskHandler = (task: TaskInterface) => {
		dispatch(fetchAddTask(task));
	};

	const changeTaskHandler = (task: TaskInterface) => {
		dispatch(updateTask(task));
	};

	const deleteTaskHandler = (id: string) => {
		dispatch(fetchDeleteTask(id, true));
	};

	return (
		<div className="backlog">
			<div className="backlog__targets">
				<div className="target" onClick={addTargetHandler}>
					Добавить цель
				</div>
				{targets.map(target => (
					<Target
						key={target._id}
						_id={target._id}
						notes={target.notes}
						date={target.date}
						isDone={target.isDone}
						name={target.name}
						deleteTarget={deleteTargetHandler}
						changeTarget={changeTargetHandler}
					/>
				))}
			</div>
			{/* <Table class="backlog" headerItems={['Срок выполнения', 'Название', 'Приоритет']}> */}
			{taskEditorIsOpen ? (
				<TaskEditor
					type="create"
					// task={task}
					submit={createTaskHandler}
					cancelEditor={() => setTaskEditorIsOpen(false)}
				/>
			) : (
				// <Button  size="small">
				// 	Добавить задачу
				// </Button>
				<div className="backlog__add-task" onClick={() => setTaskEditorIsOpen(true)}>
					<span className="material-icons">add_task</span>Добавить задачу
				</div>
			)}
			{tasks.map(task => (
				<BacklogTask
					key={task._id}
					_id={task._id}
					notes={task.notes}
					date={task.date}
					isDone={task.isDone}
					level={task.level}
					name={task.name}
					target={task.target}
					changeTask={changeTaskHandler}
					deleteTask={deleteTaskHandler}
					task={task}
				/>
			))}
			{/* </Table> */}

			{addTargetModalIsOpen && (
				<Modal closeModal={() => setAddTargetModalIsOpen(false)} backdropType="black">
					<Input
						onChange={addTargetInput.onChange}
						value={addTargetInput.value}
						touched={addTargetInput.touched}
						valid={addTargetInput.valid}
						type="text"
						placeholder="Новая цель"
					/>

					<Button onClick={createTargetHandler} size="small">
						Добавить
					</Button>
					<Button onClick={() => setAddTargetModalIsOpen(false)} size="small">
						Отмена
					</Button>
				</Modal>
			)}

			{/* {addTaskModalIsOpen && <TaskChanger close={() => setAddTaskModalIsOpen(false)} />} */}

			{/* {changeTargetModalIsOpen && (
				<Modal closeModal={() => setChangeTargetModalIsOpen(false)} backdropType="black">
					<Input
						onChange={addTargetInput.onChange}
						value={addTargetInput.value}
						touched={addTargetInput.touched}
						valid={addTargetInput.valid}
						type="text"
						placeholder="Новая цель"
					/>

					<Button onClick={createTargetHandler} size="small">
						Изменить
					</Button>
					<Button onClick={() => setAddTargetModalIsOpen(false)} size="small">
						Отмена
					</Button>
				</Modal>
			)} */}
		</div>
	);
};

export default Backlog;

import React, { useState } from 'react';
import Modal from '../../UI/Modal';
import Table from '../../Table';
import Button from '../../UI/Button';
import NewBacklogTask from './TaskEditor';
import Target from './Target';
import { useInput } from '../../../hooks/input.hook';
import Input from '../../UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddTarget, fetchDeleteTarget, updateTarget } from '../../../store/ducks/todos/actions';
import { selectTargets, selectTasks } from '../../../store/ducks/todos/selectors';
import BacklogTask from './BacklogTask';
import TaskChanger from './TaskChanger';
import TaskEditor from './TaskEditor';

interface Props {}

const Backlog: React.FC<Props> = props => {
	const dispatch = useDispatch();

	const targets = useSelector(selectTargets);
	const tasks = useSelector(selectTasks);

	const [addTargetModalIsOpen, setAddTargetModalIsOpen] = useState<boolean>(false);
	const [addTaskModalIsOpen, setAddTaskModalIsOpen] = useState<boolean>(false);
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

	const deleteTaskHandler = (id: string) => {
		// dispatch(fetchDeleteTarget(id));
	};

	const changeTaskHandler = (id: string) => {
		// dispatch(fetchDeleteTarget(id));
	};

	const changeTargetHandler = (id: string, name: string, notes: string, isDone: boolean) => {
		dispatch(updateTarget(id, name, notes, isDone));
	};

	const createTargetHandler = async () => {
		// await api.addTarget(addTargetInput.value)
		dispatch(fetchAddTarget(addTargetInput.value));
		setAddTargetModalIsOpen(true);
	};

	const createTaskHandler =  () => {
		// await api.addTarget(addTargetInput.value)
		// dispatch();
		setAddTargetModalIsOpen(true);
	};



	const addTaskHandler = () => {
		setAddTaskModalIsOpen(true)
	}

	return (
		<div className="todos__backlog">
			<div className="backlog__targets">
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
				<Button onClick={addTargetHandler} size="small">
					Новая цель
				</Button>
			</div>
			<Table class="backlog" headerItems={['Срок выполнения', 'Название', 'Приоритет']}>
				<TaskEditor />
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
					/>
				))}
			</Table>

			<Button onClick={addTaskHandler} size='small'>Добавить задачу</Button>

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

import React, { useState } from 'react';
import Target from './Target';
import { useInput } from '../../../hooks/input.hook';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchAddTarget,
	fetchAddTask,
	fetchDeleteTarget,
	fetchDeleteTask,
	updateTarget,
	updateTask,
} from '../../../store/ducks/todos/actions';
import {
	selectColors,
	selectTargets,
	selectTasks,
} from '../../../store/ducks/todos/selectors';
import BacklogTask from './BacklogTask';
import TaskEditor from './TaskEditor';
import {
	TargetInterface,
	TaskInterface,
} from '../../../store/ducks/todos/contracts/state';
import TargetEditor from './TargetEditor';
import add from '../../../assets/icons/Add.svg';

interface Props {}

const Backlog: React.FC<Props> = props => {
	const dispatch = useDispatch();

	const targets = useSelector(selectTargets);
	const tasks = useSelector(selectTasks);
	const colors = useSelector(selectColors);

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

	const changeTargetHandler = (target: TargetInterface) => {
		dispatch(updateTarget(target));
	};

	const createTargetHandler = (target: TargetInterface) => {
		dispatch(fetchAddTarget(target));
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
				{targets.map(target => (
					<Target
						key={target._id}
						{...target}
						// _id={target._id}
						// notes={target.notes}
						// date={target.date}
						// isDone={target.isDone}
						// name={target.name}
						// color={target.color}
						colors={colors}
						deleteTarget={deleteTargetHandler}
						changeTarget={changeTargetHandler}
					/>
				))}
				<div className="target" onClick={addTargetHandler}>
					Добавить цель
				</div>
			</div>
			{/* <Table class="backlog" headerItems={['Срок выполнения', 'Название', 'Приоритет']}> */}
			{taskEditorIsOpen ? (
				<TaskEditor
					type="create"
					colors={colors}
					targets={targets}
					// task={task}
					submit={createTaskHandler}
					cancelEditor={() => setTaskEditorIsOpen(false)}
				/>
			) : (
				// <Button  size="small">
				// 	Добавить задачу
				// </Button>
				<div className="backlog__add-task" onClick={() => setTaskEditorIsOpen(true)}>
					<img src={add} alt="" /> Добавить задачу
				</div>
			)}
			{tasks.map(task => (
				<BacklogTask
					key={task._id}
					// _id={task._id}
					// notes={task.notes}
					// date={task.date}
					// isDone={task.isDone}
					// level={task.level}
					// name={task.name}
					// color={task.color}
					// target={task.target}
					// subtask={task.subtask}
					{...task}
					colors={colors}
					targets={targets}
					changeTask={changeTaskHandler}
					deleteTask={deleteTaskHandler}
					task={task}
				/>
			))}
			{/* </Table> */}

			{addTargetModalIsOpen && (
				<TargetEditor
					type="create"
					closeEditor={() => setAddTargetModalIsOpen(false)}
					colors={colors}
					submit={createTargetHandler}
				/>
			)}
		</div>
	);
};

export default Backlog;

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
						colors={colors}
						deleteTargetHandler={deleteTargetHandler}
						changeTargetHandler={changeTargetHandler}
					/>
				))}
				<div className="target" onClick={addTargetHandler}>
					Добавить цель
				</div>
			</div>
			{taskEditorIsOpen ? (
				<TaskEditor
					type="create"
					colors={colors}
					targets={targets}
					submit={createTaskHandler}
					cancelEditor={() => setTaskEditorIsOpen(false)}
				/>
			) : (
				<div className="backlog__add-task" onClick={() => setTaskEditorIsOpen(true)}>
					<img src={add} alt="" /> Добавить задачу
				</div>
			)}
			{tasks.map(task => (
				<BacklogTask
					key={task._id}
					colors={colors}
					targets={targets}
					changeTaskHandler={changeTaskHandler}
					deleteTaskHandler={deleteTaskHandler}
					task={task}
				/>
			))}

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

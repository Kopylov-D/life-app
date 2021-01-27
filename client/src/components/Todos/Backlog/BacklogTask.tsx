import classNames from 'classnames';
import React, { Fragment, useState } from 'react';
import trash from '../../../assets/img/trash.svg';
import gear from '../../../assets/img/gear.svg';
import { formatDate } from '../../../services/utils/dateUtils';
import { TaskInterface } from '../../../store/ducks/todos/contracts/state';
import TaskChanger from './TaskChanger';
import { useDispatch, useSelector } from 'react-redux';
import { selectTargetsList, selectTasksList } from '../../../store/ducks/todos/selectors';
import { todosApi } from '../../../services/api/todosApi';
import Checkbox from '../../UI/Checkbox';
import { updateTask } from '../../../store/ducks/todos/actions';
import TaskEditor from './TaskEditor';
import useOutsideClick from '../../../hooks/outsideAlert.hook';

interface Props extends TaskInterface {
	deleteTask(id: string): void;
	changeTask(
		// id: string,
		// isDone?: boolean,
		// name?: string,
		// target?: string,
		// notes?: string,
		// color?: string,
		// priority?: string
		task: TaskInterface
	): void;

	task: TaskInterface;
}

const BacklogTask: React.FC<Props> = props => {
	const dispatch = useDispatch();
	const [isDoneTask, setIsDoneTask] = useState<boolean>(props.isDone);

	const [changerIsOpen, setChangerIsOpen] = useState<boolean>(false);
	const targetsList = useSelector(selectTargetsList);

	const [taskEditorIsOpen, setTaskEditorIsOpen] = useState<boolean>(false);
	const { ref, isVisible, setIsVisible } = useOutsideClick(false);

	const onChecked = () => {
		setIsDoneTask(!isDoneTask);
		props.changeTask({...props.task, isDone: !isDoneTask});
		// props.changeTask(props._id, !props.isDone);
		// onChangeTask();
	};

	const onChangeTask = (task: TaskInterface) =>
		// task: TaskInterface
		// name?: string,
		// target?: string,
		// notes?: string,
		// color?: string,
		// priority?: string
		{
			// props.changeTask(props._id, props.isDone, name, target, notes, color, priority);
			// const task: TaskInterface = {
			// 	_id: props._id,
			// 	date: props.date,
			// 	isDone: props.isDone,
			// 	level: props.level,
			// 	name: input.value,
			// 	notes: notesInput,
			// 	target: parentTarget,
			// };
			props.changeTask({...task, isDone: isDoneTask});
			setIsVisible(false);
		};

	return (
		<Fragment>
			{isVisible ? (
				<div ref={ref}>
					<TaskEditor
						_id={props._id}
						cancelEditor={() => setIsVisible(false)}
						type="edit"
						submit={onChangeTask}
						deleteTask={props.deleteTask}
						name={props.name}
						target={props.target}
						task={props.task}
					/>
				</div>
			) : (
				<div
					className={classNames('backlog-task', {
						[`${props.color}`]: props.color,
					})}
				>
					<div className="backlog-task__content">
						<Checkbox checked={props.isDone} id={props._id} onChangeHandler={onChecked} />
						<div>{props.name}</div>
					</div>

					<div className="options">
						<img src={gear} alt="" onClick={() => setIsVisible(true)}></img>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default BacklogTask;

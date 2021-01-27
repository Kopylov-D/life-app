import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchAddTask } from '../../../store/ducks/todos/actions';
import { SubtaskInterface, TaskInterface } from '../../../store/ducks/todos/contracts/state';

// interface Props extends SubtaskInterface {}
interface Props extends SubtaskInterface {}

const Subtask: React.FC<Props> = props => {
	const dispatch = useDispatch();

	const onDeleteSubtask = () => {};

	const onDecomposeSubtask = () => {
		const level = props.level - 1;
		const task: TaskInterface = {
			_id: '',
			date: new Date(),
			isDone: false,
			level,
			subtask: props._id,
			name: props.name,
			notes: '',
			target: props.target,
		}
		dispatch(
			fetchAddTask(
				task
				// props.name,
				// props.target,
				// '',
				// props.color,
				// props.priority,
				// props._id,
				// level
			)
		);
	};


	return (
		<div className="subtask">
			<div className="subtask__content">
				<span className="subtask__button material-icons" onClick={onDecomposeSubtask}>
					arrow_back
				</span>
				{/* <div>{name}</div> */}
				<div
					className={classNames('subtask__text', { 'done': props.isDone })}
				>
					{props.name}
				</div>
			</div>
			<span className="subtask__button material-icons" onClick={onDeleteSubtask}>
				delete
			</span>
		</div>
	);
};

export default Subtask;

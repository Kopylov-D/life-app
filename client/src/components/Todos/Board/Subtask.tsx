import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	decomposeSubtask,
	fetchDeleteSubtask,
	updateTask,
} from '../../../store/ducks/todos/actions';
import { fetchAddTask } from '../../../store/ducks/todos/actions';
import {
	SubtaskInterface,
	TaskInterface,
} from '../../../store/ducks/todos/contracts/state';
import { selectTasks } from '../../../store/ducks/todos/selectors';

// interface Props extends SubtaskInterface {}
interface Props extends SubtaskInterface {
	subtask: SubtaskInterface;
}

const Subtask: React.FC<Props> = props => {
	const dispatch = useDispatch();

	const onDeleteSubtask = () => {
		dispatch(fetchDeleteSubtask(props._id));
	};

	const onDecomposeSubtask = () => {
		dispatch(decomposeSubtask(props.subtask));
	};

	return (
		<div className="subtask">
			<div className="subtask__content">
				<span className="subtask__button material-icons" onClick={onDecomposeSubtask}>
					arrow_back
				</span>
				<div className={classNames('subtask__text', { done: props.isDone })}>
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

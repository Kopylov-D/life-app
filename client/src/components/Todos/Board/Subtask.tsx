import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useColorName from '../../../hooks/color.hook';
import {
	decomposeSubtask,
	fetchDeleteSubtask,
	updateTask,
} from '../../../store/ducks/todos/actions';
import { fetchAddTask } from '../../../store/ducks/todos/actions';
import {
	ColorInterface,
	SubtaskInterface,
	TaskInterface,
} from '../../../store/ducks/todos/contracts/state';
import { selectTasks } from '../../../store/ducks/todos/selectors';

// interface Props extends SubtaskInterface {}
interface Props extends SubtaskInterface {
	subtask: SubtaskInterface;
	colors: ColorInterface[]
}

const Subtask: React.FC<Props> = props => {
	const dispatch = useDispatch();
	const {colorName } = useColorName(props.color, props.colors)

	const onDeleteSubtask = () => {
		dispatch(fetchDeleteSubtask(props._id));
	};

	const onDecomposeSubtask = () => {
		dispatch(decomposeSubtask(props.subtask));
	};

	return (
		<div className={classNames("subtask", colorName)}>
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

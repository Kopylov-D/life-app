import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import useColorName from '../../../hooks/color.hook';
import { decomposeSubtask, fetchDeleteSubtask } from '../../../store/ducks/todos/actions';
import {
	ColorInterface,
	SubtaskInterface,
} from '../../../store/ducks/todos/contracts/state';
import trash from '../../../assets/icons/Trash.svg';
import arrow from '../../../assets/icons/Arrow-left-square.svg';
import Icon from '../../UI/Icons/Icon';
import CloseIcon from '../../UI/Icons/CloseIcon';
import EditFileIcon from '../../UI/Icons/EditFileIcon';

// interface Props extends SubtaskInterface {}
interface Props extends SubtaskInterface {
	subtask: SubtaskInterface;
	colors: ColorInterface[];
}

const Subtask: React.FC<Props> = props => {
	const dispatch = useDispatch();
	const { colorName } = useColorName(props.color, props.colors);

	const onDeleteSubtask = () => {
		dispatch(fetchDeleteSubtask(props._id));
	};

	const onDecomposeSubtask = () => {
		dispatch(decomposeSubtask(props.subtask));
	};

	return (
		<div className={classNames('subtask', colorName)}>
			<div className="subtask__content">
				<img
					className="subtask__button"
					src={arrow}
					alt=""
					onClick={onDecomposeSubtask}
				/>
				<div className={classNames('subtask__text', { done: props.isDone })}>
					{props.name}
				</div>
			</div>
			<img className="subtask__button" src={trash} alt="" onClick={onDeleteSubtask} />
		</div>
	);
};

export default Subtask;

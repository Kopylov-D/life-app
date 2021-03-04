import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import useColorName from '../../../hooks/color.hook';
import { decomposeSubtask, fetchDeleteSubtask } from '../../../store/ducks/todos/actions';
import {
	ColorInterface,
	SubtaskInterface,
} from '../../../store/ducks/todos/contracts/state';
import Icon from '../../UI/Icons/Icon';
import { TrashIcon, UndoIcon } from '../../UI/Icons';
import useCoordinate from '../../../hooks/useCoordinate.hook';
import Toast from '../../UI/Toast';

interface Props extends SubtaskInterface {
	subtask: SubtaskInterface;
	colors: ColorInterface[];
}

const Subtask: React.FC<Props> = props => {
	const dispatch = useDispatch();
	const { colorName } = useColorName(props.color, props.colors);
	const toastCoords = useCoordinate('bottom-left');

	const onDeleteSubtask = () => {
		dispatch(fetchDeleteSubtask(props._id));
	};

	const onDecomposeSubtask = () => {
		dispatch(decomposeSubtask(props.subtask));
	};

	return (
		<div className={classNames('subtask', colorName)}>
			<div className="subtask__content">
				<Icon classNames="undo subtask__button" onClick={onDecomposeSubtask}>
					<UndoIcon />
				</Icon>
				<div className={classNames('subtask__text', { done: props.isDone })}>
					{props.name}
				</div>
			</div>
			<div ref={toastCoords.parentRef}>
				<Icon classNames="trash" onClick={() => toastCoords.setIsVisible(true)}>
					<TrashIcon />
				</Icon>
			</div>
			{toastCoords.isVisible && (
				<Toast
					text="Вы действительно хотите удалить?"
					cancelHandler={() => toastCoords.setIsVisible(false)}
					submitHandler={onDeleteSubtask}
					selfRef={toastCoords.childRef}
					textSbmt="Удалить"
					coords={toastCoords.coords}
				/>
			)}
		</div>
	);
};

export default Subtask;

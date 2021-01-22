import React from 'react';
import trash from '../../../assets/img/trash.svg';
import gear from '../../../assets/img/gear.svg';

import { formatDate } from '../../../services/utils/dateUtils';
import { TargetInterface } from '../../../store/ducks/todos/contracts/state';
import Checkbox from '../../UI/Checkbox';

interface Props extends TargetInterface {
	deleteTarget(id: string): void;
	changeTraget(id: string): void
}

const Target: React.FC<Props> = props => {
	const onChecked = () => {};
	const onDelete = () => {
		props.deleteTarget(props._id);
	};

	const onChange = () => {
		props.changeTraget(props._id)
	} 

	return (
		<div className="target">
			<div className="target__content">
				<Checkbox checked={props.isDone} id={props._id} onChangeHandler={onChecked} />

				<div className="target__name">{props.name}</div>

				<div className="target__date">{formatDate(props.date)}</div>
			</div>
			<div className="target__options">
				<img src={trash} alt="" onClick={onDelete} />
				<img src={gear} alt="" onClick={onDelete} />
			</div>
		</div>
	);
};

export default Target;

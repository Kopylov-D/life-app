import React, { useState } from 'react';
import trash from '../../../assets/img/trash.svg';
import gear from '../../../assets/img/gear.svg';

import { formatDate } from '../../../services/utils/dateUtils';
import { TargetInterface } from '../../../store/ducks/todos/contracts/state';
import Checkbox from '../../UI/Checkbox';
import TargetChanger from './TargetChanger';

interface Props extends TargetInterface {
	deleteTarget(id: string): void;
	changeTarget(id: string, name?: string, notes?: string, isDone?: boolean): void;
}

const Target: React.FC<Props> = props => {
	const [changerIsOpen, setChangerIsOpen] = useState<boolean>(false);

	const onChecked = () => {
		const isCheked = !props.isDone;

		onChange(props.name, props.notes, isCheked);
	};
	const onDelete = () => {
		props.deleteTarget(props._id);
	};

	// const onChange = () => {
	// 	setChangerIsOpen(true);
	// };

	const onChange = (name: string, notes: string, isDone?: boolean) => {
		props.changeTarget(props._id, name, notes, isDone);
	};

	return (
		<div className="target">
			<div className="target__content">
				<Checkbox checked={props.isDone} id={props._id} onChangeHandler={onChecked} />

				<div className="target__name">{props.name}</div>

				<div className="target__date">{formatDate(props.date)}</div>
			</div>
			<div className="target__options">
				<img src={trash} alt="" onClick={onDelete} />
				<img src={gear} alt="" onClick={() => setChangerIsOpen(true)} />
			</div>

			{changerIsOpen && (
				<TargetChanger
					name={props.name}
					notes={props.notes}
					close={() => setChangerIsOpen(false)}
					submitChanges={onChange}
				/>
			)}
		</div>
	);
};

export default Target;

import React, { useEffect, useState } from 'react';
import trash from '../../../assets/img/trash.svg';
import gear from '../../../assets/img/gear.svg';

import { formatDate } from '../../../services/utils/dateUtils';
import {
	ColorInterface,
	TargetInterface,
} from '../../../store/ducks/todos/contracts/state';
import Checkbox from '../../UI/Checkbox';
import TargetChanger from './TargetChanger';
import classNames from 'classnames';
import useColorName from '../../../hooks/color.hook';

interface Props extends TargetInterface {
	colors: ColorInterface[];
	deleteTarget(id: string): void;
	changeTarget(target: TargetInterface): void;
}

const Target: React.FC<Props> = props => {
	const [changerIsOpen, setChangerIsOpen] = useState<boolean>(false);
	// const [color, setColor] = useState<string>('');

	const {colorName} = useColorName(props.color, props.colors);

	// useEffect(() => {
	// 	const color = props.colors.find(color => color._id === props.color)?.name
	// 	color && setColor(color)
	// }, [props.color])
	// const onChecked = () => {
	// 	const isCheked = !props.isDone;

	// 	onChange(props.name, props.notes, isCheked);
	// };

	const onDelete = () => {
		props.deleteTarget(props._id);
	};

	// const onChange = () => {
	// 	setChangerIsOpen(true);
	// };

	const onChange = (target: TargetInterface) => {
		props.changeTarget(target);
	};

	return (
		<div className={classNames('target', colorName)}>
			<div className="target__content">
				{/* <Checkbox checked={props.isDone} id={props._id} onChangeHandler={onChecked} /> */}

				<div className="target__name">{props.name}</div>
			</div>
			<div className="target__date">{formatDate(props.date)}</div>
			<div className="target__options">
				{/* <img src={trash} alt="" onClick={onDelete} /> */}
				<img src={gear} alt="" onClick={() => setChangerIsOpen(true)} />
			</div>

			{changerIsOpen && (
				<TargetChanger
					_id={props._id}
					isDone={props.isDone}
					date={props.date}
					name={props.name}
					notes={props.notes}
					color={props.color}
					close={() => setChangerIsOpen(false)}
					submitChanges={onChange}
					colors={props.colors}
				/>
			)}
		</div>
	);
};

export default Target;

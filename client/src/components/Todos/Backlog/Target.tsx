import React from 'react';
import trash from '../../../assets/img/trash.svg';
import { TargetInterface } from '../../../store/ducks/todos/types';
import Checkbox from '../../UI/Checkbox';

interface Props extends TargetInterface {

}

const Target: React.FC<Props> = ({_id, name, isDone, date, notes}) => {

	const onChecked = () => {

	}
	return (
		<div className="target">
			<div className="target__content">
				<Checkbox  checked={isDone} id={_id} onChangeHandler={onChecked}/>

				<div className='target__name'>name</div>

				<div className='target__date'>22.01.2022</div>
			</div>

			<img src={trash} alt="" />
		</div>
	);
};

export default Target;

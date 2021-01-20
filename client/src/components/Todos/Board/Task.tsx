import React, { useState } from 'react';
import { useInput } from '../../../hooks/input.hook';
import { TaskInterface } from '../../../store/ducks/todos/contracts/state';
import Checkbox from '../../UI/Checkbox';
import Input from '../../UI/Input';

interface Props extends TaskInterface {
	// subtasks:
	onDelete(id: string): void;
	onChecked(id: string): void;
}

const Task: React.FC<Props> = props => {
	const [subtasksIsOpen, setsubtasksIsOpen] = useState<boolean>(true);
	const input = useInput({ initialValue: '' }, { maxLength: 50, required: true });

	const onChangeHandler = (id: string) => {
		props.onChecked(id);
	};

	const onDeleteTask = () => {
		props.onDelete(props._id);
	};

	let task = (
		<div className='task__main'>
			<div className="task__content">
				<Checkbox
					checked={props.isDone}
					id={props._id}
					onChangeHandler={onChangeHandler}
					value={props.name}
				/>

				<span className="task__expand material-icons">
					{subtasksIsOpen ? 'expand_less' : 'expand_more'}
				</span>
				<div className="task__counter">0/2</div>
			</div>
			<div className="task__extend">
				{/* <div>{}</div> */}
				<div className="task__input">
					<Input
						onChange={input.onChange}
						touched={input.touched}
						type="text"
						valid={input.valid}
						value={input.value}
						placeholder="Новая подзадача"
					/>
				</div>
			</div>
		</div>
	);

	if (props.level === 1) {
		task = (
			<div>
				<div className="task__content">
					<Checkbox
						checked={props.isDone}
						id={props._id}
						onChangeHandler={onChangeHandler}
						value={props.name}
					/>

					<span className="task__expand material-icons">
						{subtasksIsOpen ? 'expand_less' : 'expand_more'}
					</span>
				</div>
			</div>
		);
	}

	return (
		<div className="task">
			{task}
			<span className="task__button material-icons" onClick={onDeleteTask}>
				delete
			</span>
		</div>
	);
};

export default Task;

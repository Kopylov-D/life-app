import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useInput } from '../../../hooks/input.hook';
import { fetchAddSubtask } from '../../../store/ducks/todos/actions';
import {
	SubtaskInterface,
	TaskInterface,
} from '../../../store/ducks/todos/contracts/state';
import Checkbox from '../../UI/Checkbox';
import Input from '../../UI/Input';
import Subtask from './Subtask';

interface Props extends TaskInterface {
	// subtasks: SubtaskInterface[]
	onDelete(id: string): void;
	onChecked(id: string): void;
}

const Task: React.FC<Props> = props => {
	const dispatch = useDispatch();

	const [subtasksIsOpen, setSubtasksIsOpen] = useState<boolean>(false);
	const input = useInput({ initialValue: '' }, { maxLength: 50, required: true });

	const onChangeHandler = () => {
		// props.onChecked(id);
	};

	const onDeleteTask = () => {
		props.onDelete(props._id);
	};

	const onAddSubtask = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			console.log('enter', props._id);
			dispatch(fetchAddSubtask(input.value, props._id, props.target));
		}
	};

	const onToggleSubtasks = () => {
		setSubtasksIsOpen(!subtasksIsOpen);
	};

	let task = (
		<Fragment>
			<div className="task__main">
				<div className="task__content">
					<Checkbox
						checked={props.isDone}
						id={props._id}
						onChangeHandler={onChangeHandler}
						value={props.name}
					/>

					<span className="task__expand material-icons" onClick={onToggleSubtasks}>
						{subtasksIsOpen ? 'expand_less' : 'expand_more'}
					</span>
					<div className="task__counter">0/2</div>
				</div>
				<span className="task__button material-icons" onClick={onDeleteTask}>
					delete
				</span>
			</div>

			{subtasksIsOpen && (
				<div className="task__extend">
					{/* <div>{}</div> */}
					<Subtask />
					<Input
						className="task"
						onChange={input.onChange}
						touched={input.touched}
						type="text"
						valid={input.valid}
						value={input.value}
						placeholder="Новая подзадача"
						onKeyPress={onAddSubtask}
					/>
				</div>
			)}
		</Fragment>
	);

	if (props.level === 1) {
		task = (
			<Fragment>
				<div className="task__main">
					<div className="task__content">
						<Checkbox
							checked={props.isDone}
							id={props._id}
							onChangeHandler={onChangeHandler}
							value={props.name}
						/>

						<span className="task__expand material-icons" onClick={onToggleSubtasks}>
							{subtasksIsOpen ? 'expand_less' : 'expand_more'}
						</span>
					</div>
					<span className="task__button material-icons" onClick={onDeleteTask}>
						delete
					</span>
				</div>

				{subtasksIsOpen && (
					<div className="task__extend">
						<textarea></textarea>
					</div>
				)}
			</Fragment>
		);
	}

	return <div className="task">{task}</div>;
};

export default Task;

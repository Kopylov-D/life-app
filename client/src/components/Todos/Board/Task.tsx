import classNames from 'classnames';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useColorName from '../../../hooks/color.hook';
import { useInput } from '../../../hooks/input.hook';
import { fetchAddSubtask, updateTask } from '../../../store/ducks/todos/actions';
import {
	ColorInterface,
	SubtaskInterface,
	TaskInterface,
} from '../../../store/ducks/todos/contracts/state';
import Checkbox from '../../UI/Checkbox';
import Input from '../../UI/Input';
import Subtask from './Subtask';

interface Props extends TaskInterface {
	subtasks: SubtaskInterface[];
	task: TaskInterface;
	colors: ColorInterface[];
	onDelete(id: string): void;
	onChecked(task: TaskInterface): void;
}

const Task: React.FC<Props> = props => {
	const dispatch = useDispatch();

	const [subtasksIsOpen, setSubtasksIsOpen] = useState<boolean>(false);
	const [numOfSubtask, setNumOfSubtask] = useState(0);
	const [numDoneSubtask, setNumDoneSubtask] = useState(0);
	const { colorName } = useColorName(props.color, props.colors);

	const input = useInput({ initialValue: '' }, { maxLength: 50, required: true });

	useEffect(() => {
		let numOfSubtaskCounter = 0;
		let numDoneSubtaskCounter = 0;

		props.subtasks.forEach(subtask => {
			if (subtask.task === props._id) {
				numOfSubtaskCounter++;
				subtask.isDone && numDoneSubtaskCounter++;
			}
		});

		//TODO Оптимизировать через редакс

		setNumOfSubtask(numOfSubtaskCounter);
		setNumDoneSubtask(numDoneSubtaskCounter);

		console.log(1);
		
	}, [props.subtasks]);

	const onChecked = () => {
		props.onChecked({ ...props.task, isDone: !props.isDone });
	};

	const onDeleteTask = () => {
		props.onDelete(props._id);
	};

	const onAddSubtask = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && input.valid) {
			const subtask: SubtaskInterface = {
				_id: '',
				date: new Date(),
				isDone: false,
				level: props.level,
				name: input.value,
				target: props.target,
				task: props._id,
				color: props.color,
			};
			dispatch(fetchAddSubtask(subtask));
			dispatch(updateTask({ ...props.task, isDone: false }, false));

			input.clearValue();
		}
	};

	const onToggleSubtasks = () => {
		setSubtasksIsOpen(!subtasksIsOpen);
	};

	let task = (
		<Fragment>
			<div className={classNames('task__main', { [`${colorName}`]: colorName })}>
				<div className="task__content">
					<Checkbox
						checked={props.isDone}
						id={props._id}
						onChangeHandler={onChecked}
						value={props.name}
					/>

					<span className="task__expand material-icons" onClick={onToggleSubtasks}>
						{subtasksIsOpen ? 'expand_less' : 'expand_more'}
					</span>
					<div className="task__counter">
						{numDoneSubtask}/{numOfSubtask}
					</div>
				</div>
				<span className="task__button material-icons" onClick={onDeleteTask}>
					delete
				</span>
			</div>

			{subtasksIsOpen && (
				<div className="task__extend">
					{props.subtasks.map(subtask => {
						if (subtask.task === props._id) {
							return (
								<Subtask
									key={subtask._id}
									_id={subtask._id}
									date={subtask.date}
									isDone={subtask.isDone}
									level={subtask.level}
									name={subtask.name}
									target={subtask.target}
									task={subtask.task}
									subtask={subtask}
									colors={props.colors}
									// parentTask={}
								/>
							);
						}
					})}
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
				<div className={classNames('task__main', { [`${colorName}`]: colorName })}>
					<div className="task__content">
						<Checkbox
							checked={props.isDone}
							id={props._id}
							onChangeHandler={onChecked}
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

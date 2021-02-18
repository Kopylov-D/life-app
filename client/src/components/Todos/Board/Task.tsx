import classNames from 'classnames';
import React, { createRef, Fragment, useEffect, useState } from 'react';
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
import shevron from '../../../assets/icons/Shevron-down.svg';
import trash from '../../../assets/icons/Trash.svg';
import { setColor } from '../../../services/utils/commonUtils';
import useCoordinate from '../../../hooks/useCoordinate.hook';
import Tooltip from '../../UI/Tooltip';

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

	const input = useInput(
		{ initialValue: '' },
		{ maxLength: 50, required: false, isEmpty: true }
	);

	// const parentRef1 = createRef<HTMLDivElement>()

	const { coords, setIsVisible, isVisible, childRef, parentRef } = useCoordinate();

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
	}, [props.subtasks]);

	const onChecked = () => {
		props.onChecked({
			...props.task,
			isDone: !props.isDone,
			inArchive: !props.inArchive,
		});
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

	const onMouseOver = () => {
		setIsVisible(true);
	};
	const onMouseLeave = () => {
		setIsVisible(false);
	};

	let task = (
		<Fragment>
			<div className={classNames('task__main', { [`${colorName}`]: colorName })}>
				<div className="task__content">
					<Checkbox
						checked={props.isDone}
						onChangeHandler={onChecked}
						color={setColor(props.priority)}
					/>

					<span
						className="task__text"
						onMouseOver={onMouseOver}
						onMouseLeave={onMouseLeave}
						ref={parentRef}
					>
						{props.name}
					</span>

					{isVisible && (
						<Tooltip
							text={props.name}
							selfRef={childRef}
							coords={coords}
							isVisible={isVisible}
						/>
					)}

					<img
						onClick={onToggleSubtasks}
						src={shevron}
						alt=""
						className={classNames('shevron', { 'shevron-up': subtasksIsOpen })}
					/>

					<div className="task__counter">
						{numDoneSubtask}/{numOfSubtask}
					</div>
				</div>
				<img src={trash} alt="" onClick={onDeleteTask} />
			</div>

			{subtasksIsOpen && (
				<div className="task__extend">
					{props.subtasks.map(subtask => {
						if (subtask.task === props._id) {
							return (
								<Subtask
									key={subtask._id}
									{...subtask}
									subtask={subtask}
									colors={props.colors}
								/>
							);
						}
					})}
					<Input
						className="task"
						onChange={input.onChange}
						touched={input.touched}
						onBlur={input.onBlur}
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
							onChangeHandler={onChecked}
							color={setColor(props.priority)}
						/>
						<span className="task__text">{props.name}</span>
					</div>
					<img src={trash} alt="" onClick={onDeleteTask} />
				</div>
			</Fragment>
		);
	}

	return <div className="task">{task}</div>;
};

export default Task;

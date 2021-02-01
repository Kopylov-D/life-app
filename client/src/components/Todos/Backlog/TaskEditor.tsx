import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useInput } from '../../../hooks/input.hook';
import Backdrop from '../../UI/Backdrop';
import Input from '../../UI/Input';
import calendar from '../../../assets/img/calendar.svg';
import trash from '../../../assets/img/trash.svg';
import warning from '../../../assets/img/warning.svg';
import edit from '../../../assets/img/edit.svg';
import Button from '../../UI/Button';
import Select from '../../UI/Select';
import { useSelector } from 'react-redux';
import { selectTargetsList } from '../../../store/ducks/todos/selectors';
import {
	ColorInterface,
	TargetInterface,
	TaskInterface,
} from '../../../store/ducks/todos/contracts/state';
import useColorName from '../../../hooks/color.hook';

interface Props {
	task?: TaskInterface;
	type: 'edit' | 'create';
	_id?: string;
	target?: string;
	subtask?: string;
	name?: string;
	isDone?: boolean;
	notes?: string;
	color?: string;

	colors: ColorInterface[];
	targets: TargetInterface[];
	submit(task: TaskInterface): void;
	cancelEditor(): void;
	deleteTask?(id: string): void;
}

const TaskEditor: React.FC<Props> = props => {
	const [currentDate, setCurrentDate] = useState<Date | Date[]>(new Date());
	const input = useInput(
		{ initialValue: props.name ? props.name : '' },
		{ maxLength: 50 }
	);
	const [calendarIsOpen, setCalendarIsOpen] = useState<boolean>(false);
	const selectTargets = useSelector(selectTargetsList);
	const [parentTarget, setParentTarget] = useState<string>();
	const [priority, setPriority] = useState<string>();
	const [notesInput, setNotesInput] = useState<string>(props.notes!);
	// const [color, setColor] = useState<string | undefined>(props.color);

	const onKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			onSubmit();
		}
	};

	console.log(props.color);
	

	const { colorId } = useColorName(
		props.color,
		props.colors,
		parentTarget,
		props.targets
	);

	const onSubmit = () => {
		if (input.valid) {
			let task: TaskInterface;

			if (props.type === 'edit') {
				task = {
					_id: props.task!._id,
					date: props.task!.date,
					isDone: props.task!.isDone,
					level: props.task!.level,
					color: colorId ? colorId : props.color,
					name: input.value,
					notes: notesInput,
					target: parentTarget,
					subtask: props.subtask
				};
			} else {
				task = {
					_id: '',
					date: new Date(),
					isDone: false,
					level: 0,
					name: input.value,
					color: colorId && colorId,
					notes: notesInput,
					target: parentTarget,
				};
			}

			props.submit(task);
			props.type === 'create' && input.clearValue();
		}
	};

	const deleteTask = () => {
		props.deleteTask!(props._id!);
	};

	const onToggleCalendarHandler = () => {
		setCalendarIsOpen(isOpen => !isOpen);
	};

	const onChangeDateHandler = (value: Date | Date[]) => {
		setCurrentDate(value);
		onToggleCalendarHandler();
	};

	return (
		<div className="task-editor">
			<div className="task-editor__content">
				<Input
					value={input.value}
					placeholder="Задача"
					className="task-editor"
					valid={input.valid}
					touched={input.touched}
					onChange={input.onChange}
					onKeyPress={onKeyEnter}
				/>
				<div className="task-editor__options">
					{!props.subtask && (
						<Select
							items={selectTargets}
							onItemClick={id => setParentTarget(id)}
							initialValue="Выбрать цель"
							initialId={props.target}
						/>
					)}
					<img src={calendar} alt="" onClick={onToggleCalendarHandler}></img>
					<img src={edit} alt="" onClick={onToggleCalendarHandler}></img>
					<img src={warning} alt="" onClick={onToggleCalendarHandler}></img>
					{props.type === 'edit' && <img src={trash} alt="" onClick={deleteTask}></img>}
				</div>
			</div>

			<div className="task-editor__footer">
				<Button onClick={onSubmit} size="small">
					{props.type === 'create' ? 'Добавить задачу' : 'Сохранить'}
				</Button>
				<Button onClick={props.cancelEditor} size="small" color="secondary">
					Отмена
				</Button>
			</div>

			{calendarIsOpen && (
				<div className="calendar">
					<Calendar value={currentDate} onChange={onChangeDateHandler} />
					<Backdrop onClick={onToggleCalendarHandler} type="black" />
				</div>
			)}
		</div>
	);
};

export default TaskEditor;

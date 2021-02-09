import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useSelector } from 'react-redux';
import { useInput } from '../../../hooks/input.hook';
import Backdrop from '../../UI/Backdrop';
import Input from '../../UI/Input';
import { ReactComponent as Clock } from '../../../assets/icons/time-outline.svg';
import { ReactComponent as Trash } from '../../../assets/icons/trash-outline.svg';
import { ReactComponent as Edit } from '../../../assets/icons/create-outline.svg';
import Button from '../../UI/Button';
import Select from '../../UI/Select';
import { selectTargetsList } from '../../../store/ducks/todos/selectors';
import {
	ColorInterface,
	Priority,
	TargetInterface,
	TaskInterface,
} from '../../../store/ducks/todos/contracts/state';
import useColorName from '../../../hooks/color.hook';
import Modal from '../../UI/Modal';
import Textarea from '../../UI/Textarea';
import PriorityPicker from '../../PriorityPicker';
import { toDate } from '../../../services/utils/dateUtils';
import Icon from '../../UI/Icons/Icon';

interface Props {
	type: 'edit' | 'create';
	colors: ColorInterface[];
	targets: TargetInterface[];
	submit(task: TaskInterface): void;
	cancelEditor(): void;
	deleteTask?(id: string): void;

	_id?: string;
	date?: Date;
	target?: string;
	subtask?: string;
	name?: string;
	level?: number;
	isDone?: boolean;
	notes?: string;
	color?: string;
	inArchive?: boolean;
	expiresIn?: Date;
	priority?: Priority;
}

const TaskEditor: React.FC<Props> = props => {
	const selectTargets = useSelector(selectTargetsList);

	const input = useInput(
		{ initialValue: props.name ? props.name : '' },
		{ maxLength: 50 }
	);

	const [currentDate, setCurrentDate] = useState<Date>(
		props.expiresIn ? toDate(props.expiresIn) : new Date()
	);
	const [calendarIsOpen, setCalendarIsOpen] = useState<boolean>(false);
	const [noteEditorIsOpen, setNotesEditorIsOpen] = useState<boolean>(false);
	const [parentTarget, setParentTarget] = useState<string>();
	const [priority, setPriority] = useState<Priority>(props.priority || Priority.none);
	const [notesInput, setNotesInput] = useState<string>(props.notes!);

	const onKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			onSubmit();
		}
	};

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
					_id: props._id!,
					date: props.date!,
					isDone: props.isDone!,
					level: props.level!,
					color: colorId ? colorId : props.color,
					name: input.value,
					notes: notesInput,
					target: parentTarget,
					subtask: props.subtask,
					inArchive: props.inArchive!,
					expiresIn: currentDate,
					priority,
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
					inArchive: false,
					expiresIn: currentDate ? currentDate : undefined,
					priority,
				};
			}

			props.submit(task);
			props.type === 'create' && input.clearValue();
		}
	};

	const deleteTask = () => {
		props.deleteTask!(props._id!);
	};

	const onChangeDateHandler = (value: Date | Date[]) => {
		if (Array.isArray(value)) {
			setCurrentDate(value[0]);
		} else setCurrentDate(value);

		setCalendarIsOpen(false);
	};

	const onChangeArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNotesInput(e.target.value);
	};

	const OnCancelNotesEdit = () => {
		setNotesEditorIsOpen(false);
		setNotesInput(props.notes!);
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
					<Icon name="clock" onClick={() => setCalendarIsOpen(true)}>
						<Clock />
					</Icon>
					<Icon name="edit" onClick={() => setNotesEditorIsOpen(true)}>
						<Edit />
					</Icon>
					<PriorityPicker
						priority={priority}
						changePriority={(id: number) => setPriority(id)}
					/>

					{props.type === 'edit' && (
						<Icon name="trash" onClick={deleteTask}>
							<Trash />
						</Icon>
					)}
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
					<Backdrop onClick={() => setCalendarIsOpen(false)} type="black" />
				</div>
			)}

			{noteEditorIsOpen && (
				<Modal closeModal={OnCancelNotesEdit}>
					<Textarea value={notesInput} onChange={onChangeArea} />
					<Button onClick={() => setNotesEditorIsOpen(false)}>Принять</Button>
					<Button onClick={OnCancelNotesEdit}>Отмена</Button>
				</Modal>
			)}
		</div>
	);
};

export default TaskEditor;

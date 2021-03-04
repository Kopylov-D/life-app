import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
	ColorInterface,
	Priority,
	TargetInterface,
	TaskInterface,
} from '../../../store/ducks/todos/contracts/state';
import { selectTargetsList } from '../../../store/ducks/todos/selectors';
import { useInput } from '../../../hooks/input.hook';
import useColorName from '../../../hooks/color.hook';
import { toDate } from '../../../services/utils/dateUtils';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import Select from '../../UI/Select';
import Modal from '../../UI/Modal';
import Textarea from '../../UI/Textarea';
import PriorityPicker from '../../PriorityPicker';
import Calendar from '../../Calendar';
import Icon from '../../UI/Icons/Icon';
import { CalendarIcon, EditIcon, TrashIcon } from '../../UI/Icons';
import NotesEditor from './NotesEditor';
import useCoordinate from '../../../hooks/useCoordinate.hook';
import Toast from '../../UI/Toast';

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
		{ maxLength: 50, isEmpty: true }
	);

	const toastCoords = useCoordinate('bottom-left');
	

	const [currentDate, setCurrentDate] = useState<Date>(
		props.expiresIn ? toDate(props.expiresIn) : new Date()
	);
	const [calendarIsOpen, setCalendarIsOpen] = useState<boolean>(false);
	const [notesEditorIsOpen, setNotesEditorIsOpen] = useState<boolean>(false);
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

	const onChangeNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNotesInput(e.target.value);
	};

	const onCancelNotesEdit = () => {
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
					<Icon classNames="clock" onClick={() => setCalendarIsOpen(true)}>
						<CalendarIcon />
					</Icon>
					<Icon classNames="edit" onClick={() => setNotesEditorIsOpen(true)}>
						<EditIcon />
					</Icon>
					<PriorityPicker
						priority={priority}
						changePriority={(id: number) => setPriority(id)}
					/>

					{props.type === 'edit' && (
						<div ref={toastCoords.parentRef}>
							<Icon classNames="trash" onClick={() => toastCoords.setIsVisible(true)}>
								<TrashIcon />
							</Icon>
						</div>
					)}
				</div>
			</div>

			{toastCoords.isVisible && (
				<Toast
					text="Вы действительно хотите удалить?"
					cancelHandler={() => toastCoords.setIsVisible(false)}
					submitHandler={deleteTask}
					selfRef={toastCoords.childRef}
					textSbmt="Удалить"
					coords={toastCoords.coords}
				/>
			)}

			<div className="task-editor__footer">
				<Button onClick={onSubmit} size="small" disabled={!input.valid}>
					{props.type === 'create' ? 'Добавить задачу' : 'Сохранить'}
				</Button>
				<Button onClick={props.cancelEditor} size="small" color="secondary">
					Отмена
				</Button>
			</div>

			{calendarIsOpen && (
				<Calendar
					closeCalendar={() => setCalendarIsOpen(false)}
					currentDate={currentDate}
					onChange={onChangeDateHandler}
				/>
			)}

			{notesEditorIsOpen && (
				<NotesEditor
					closeEditor={() => setNotesEditorIsOpen(false)}
					onCancelNotesEdit={onCancelNotesEdit}
					notesValue={notesInput}
					onChangeNotes={onChangeNotes}
				/>
			)}
		</div>
	);
};

export default TaskEditor;

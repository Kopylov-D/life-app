import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useInput } from '../../../hooks/input.hook';
import { formatDate } from '../../../services/utils/dateUtils';
import Backdrop from '../../UI/Backdrop';
import Input from '../../UI/Input';
import calendar from '../../../assets/img/calendar.svg';
import trash from '../../../assets/img/trash.svg';
import warning from '../../../assets/img/warning.svg';
import edit from '../../../assets/img/edit.svg';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';
import Select from '../../UI/Select';
import { useSelector } from 'react-redux';
import { selectTargetsList } from '../../../store/ducks/todos/selectors';
import { TaskInterface } from '../../../store/ducks/todos/contracts/state';

interface Props {
	type: 'edit' | 'create';
	_id?: string;
	target?: string;
	subtask?: string;
	name?: string;
	isDone?: boolean;
	notes?: string;
	color?: string;
	submit(
		name: string,
		target?: string,
		notes?: string,
		color?: string,
		priority?: string
	): void;
	cancelEditor(): void;
	deleteTask?(id: string): void
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
	const [notesInput, setNotesInput] = useState<string | undefined>(props.notes);
	const [color, setColor] = useState<string | undefined>(props.color);

	const onKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			onSubmit();
		}
	};

	const onSubmit = () => {
		if (input.valid) {
			props.submit(input.value, parentTarget);
			props.type === 'create' && input.clearValue();
		}
	};

	const deleteTask = () => {
		props.deleteTask!(props._id!)
	}

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
					// type="text"
					valid={input.valid}
					touched={input.touched}
					onChange={input.onChange}
					onKeyPress={onKeyEnter}
				/>

				{/* <Select
				items={filtredCategories}
				initialId={currentCategory && currentCategory._id}
				onItemClick={setCurrentCategoryId}
			/> */}
				<div className="task-editor__options">
					{/* <Toggle
					textPrimary="расходы"
					textSecondary="доходы"
					colorPrimary="color-expense"
					colorSecondary="color-income"
					onSwitch={setIsExpense}
					flag={isExpense}
				/> */}
					<Select
						items={selectTargets}
						onItemClick={id => setParentTarget(id)}
						initialValue="Выбрать цель"
						initialId={props.target}
					/>
					<img src={calendar} alt="" onClick={onToggleCalendarHandler}></img>
					<img src={edit} alt="" onClick={onToggleCalendarHandler}></img>
					<img src={warning} alt="" onClick={onToggleCalendarHandler}></img>
					{props.type === 'edit' && (
						<img src={trash} alt="" onClick={deleteTask}></img>
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
					<Backdrop onClick={onToggleCalendarHandler} type="black" />
				</div>
			)}
		</div>
	);
};

export default TaskEditor;

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useInput } from '../../../hooks/input.hook';
import { formatDate } from '../../../services/utils/dateUtils';
import Backdrop from '../../UI/Backdrop';
import Input from '../../UI/Input';
import calendar from '../../../assets/img/calendar.svg';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';
import Select from '../../UI/Select';
import { useSelector } from 'react-redux';
import { selectTargetsList } from '../../../store/ducks/todos/selectors';
import { TaskInterface } from '../../../store/ducks/todos/contracts/state';

interface Props extends TaskInterface {
	type: 'edit' | 'create';
}

const TaskEditor: React.FC<Props> = props => {
	const [currentDate, setCurrentDate] = useState<Date | Date[]>(new Date());
	const input = useInput({ initialValue: '' }, { maxLength: 50 });
	const [calendarIsOpen, setCalendarIsOpen] = useState<boolean>(false);
	const selectTargets = useSelector(selectTargetsList)
	const [parentTarget, setParentTarget] = useState<string>();
	const [priority, setPriority] = useState<string>();
	const [notesInput, setNotesInput] = useState<string>(props.notes);
	const [color, setColor] = useState<string | undefined>(props.color);


	const onKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && input.valid) {
			console.log('enter');
		}
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
			<Input
				value={input.value}
				placeholder="Новая задача"
				className="task-editor"
				// type="text"
				valid={input.valid}
				touched={input.touched}
				onChange={input.onChange}
				onKeyPress={onKeyEnter}
			/>
			<Select
				items={selectTargets}
				onItemClick={id => setParentTarget(id)}
				initialValue="Выбрать цель"
				initialId={props.target}
			/>
			{/* <Select
				items={filtredCategories}
				initialId={currentCategory && currentCategory._id}
				onItemClick={setCurrentCategoryId}
			/> */}
			<div className="options">
				{/* <Toggle
					textPrimary="расходы"
					textSecondary="доходы"
					colorPrimary="color-expense"
					colorSecondary="color-income"
					onSwitch={setIsExpense}
					flag={isExpense}
				/> */}
				<img src={calendar} alt="" onClick={onToggleCalendarHandler}></img>
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

import React, { useEffect, useState } from 'react';
import Calendar from '../../Calendar';
import Input from '../../UI/Input';
import calendar from '../../../assets/img/calendar.svg';
import Select from '../../UI/Select';
import { CategoryInterface } from '../../../store/ducks/budget/types';
import { formatDate } from '../../../services/utils/dateUtils';
import Toggle from '../../UI/Toggle';
import { useInput } from '../../../hooks/input.hook';

interface Props {
	categories: CategoryInterface[];
	currentCategory: CategoryInterface;
	onAddTransaction(
		categoryId: string,
		amount: number,
		isExpense: boolean,
		currentDate: Date | Date[]
	): void;
}

const NewTransaction: React.FC<Props> = ({
	categories,
	currentCategory,
	onAddTransaction,
}) => {
	const [categoryId, setCategoryId] = useState<string>('');
	const [isExpense, setIsExpense] = useState<boolean>(false);
	const [calendarIsOpen, setCalendarIsOpen] = useState<boolean>(false);
	const [currentDate, setCurrentDate] = useState<Date>(new Date());
	const [filtredCategories, setfiltredCategories] = useState<any>([]);

	const input = useInput(
		{ initialValue: '' },
		{ required: false, isNumber: true, maxLength: 12, isEmpty: true }
	);

	useEffect(() => {
		// setCategoryId(currentCategory._id);
		const cat = categories.filter(item => item.isExpense === isExpense);
		const items = cat.map(item => {
			return {
				id: item._id,
				value: item.name,
			};
		});
		setfiltredCategories(items);
	}, [categories, isExpense]);

	useEffect(() => {
		currentCategory && setCategoryId(currentCategory._id);
	}, [currentCategory]);

	const onKeyEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && input.valid) {
			const amount = +input.value;
			input.clearValue();
			onAddTransaction(categoryId, amount, isExpense, currentDate);
		} else if (event.key === 'Enter' && !input.valid) {
			input.value = '';
		}
	};

	const setCurrentCategoryId = (id: string) => {
		setCategoryId(id);
	};

	const onChangeDateHandler = (value: Date) => {
		setCurrentDate(value);
		onToggleCalendarHandler();
	};

	const onToggleCalendarHandler = () => {
		setCalendarIsOpen(isOpen => !isOpen);
	};

	return (
		<div className="table__item">
			<div>{formatDate(currentDate)}</div>
			<Input
				value={input.value}
				placeholder="Новая операция"
				className="table"
				type="text"
				valid={input.valid}
				touched={input.touched}
				onChange={input.onChange}
				onBlur={input.onBlur}
				onKeyPress={onKeyEnter}
			/>
			<Select
				items={filtredCategories}
				initialId={currentCategory && currentCategory._id}
				onItemClick={setCurrentCategoryId}
			/>
			<div className="options">
				<Toggle
					textPrimary="расходы"
					textSecondary="доходы"
					colorPrimary="color-expense"
					colorSecondary="color-income"
					onSwitch={setIsExpense}
					flag={isExpense}
				/>
				<img src={calendar} alt="" onClick={onToggleCalendarHandler}></img>
			</div>

			{calendarIsOpen && (
				<Calendar
					currentDate={currentDate}
					onChange={onChangeDateHandler}
					closeCalendar={onToggleCalendarHandler}
				/>
			)}
		</div>
	);
};

export default NewTransaction;

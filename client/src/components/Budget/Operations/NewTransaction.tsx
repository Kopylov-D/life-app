import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import Input from '../../UI/Input';
import calendar from '../../../assets/img/calendar.svg';
import Select from '../../UI/Select';
import { CategoryInterface } from '../../../store/ducks/budget/types';
import { formatDate } from '../../../services/utils/dateUtils';
import Backdrop from '../../UI/Backdrop';
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
	const [currentDate, setCurrentDate] = useState<Date | Date[]>(new Date());
	const [filtredCategories, setfiltredCategories] = useState<any>([]);

	const input = useInput(
		{ initialValue: '' },
		{ required: true, isNumber: true, maxLength: 12 }
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

	const onChangeDateHandler = (value: Date | Date[]) => {
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
				<div className="calendar">
					<Calendar value={currentDate} onChange={onChangeDateHandler} />
					<Backdrop onClick={onToggleCalendarHandler} type="black" />
				</div>
			)}
		</div>
	);
};

export default NewTransaction;

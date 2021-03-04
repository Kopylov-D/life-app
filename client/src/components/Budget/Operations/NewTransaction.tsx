import React, { Fragment, useEffect, useState } from 'react';
import { useInput } from '../../../hooks/input.hook';
import { formatDate } from '../../../services/utils/dateUtils';
import { CategoryInterface } from '../../../store/ducks/budget/contracts/state';
import Calendar from '../../Calendar';
import Input from '../../UI/Input';
import Select from '../../UI/Select';
import Toggle from '../../UI/Toggle';
import { CalendarIcon } from '../../UI/Icons';
import Icon from '../../UI/Icons/Icon';
import Table from '../../Table';

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
		{ required: false, isNumber: true, isPositiveNumber: false, maxLength: 12, isEmpty: true }
	);

	useEffect(() => {
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
		<Fragment>
			<Table className="operations">
				<div className="table__item new-transaction">
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
					<div className="table__options new-transaction__options">
						<Toggle
							textPrimary="расходы"
							textSecondary="доходы"
							colorPrimary="color-expense"
							colorSecondary="color-income"
							onSwitch={setIsExpense}
							flag={isExpense}
						/>
						<Icon classNames="calendar">
							<CalendarIcon onClick={onToggleCalendarHandler} />
						</Icon>
					</div>
				</div>
			</Table>
			{calendarIsOpen && (
				<Calendar
					currentDate={currentDate}
					onChange={onChangeDateHandler}
					closeCalendar={onToggleCalendarHandler}
				/>
			)}
		</Fragment>
	);
};

export default NewTransaction;

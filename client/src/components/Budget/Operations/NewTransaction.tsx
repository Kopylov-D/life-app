import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import {
	createControl,
	FormControl,
	validate,
} from '../../../services/validations/form';
import Input from '../../UI/Input';
import calendar from '../../../assets/img/calendar.svg';
import Select from '../../UI/Select';
import { CategoryInterface } from '../../../store/ducks/budget/types';
import { formatDate } from '../../../services/utils/dateUtils';
import Switch from '../../UI/Switch';
import Backdrop from '../../UI/Backdrop';
import Toggle from '../../UI/Toggle';

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
	const [control, setControl] = useState<FormControl>(
		createControl(
			{ type: 'text', class: 'table' },
			{ required: true, isNumber: true, notNull: true }
		)
	);

	const [categoryId, setCategoryId] = useState<string>('');
	const [isExpense, setIsExpense] = useState<boolean>(false);
	const [calendarIsOpen, setCalendarIsOpen] = useState<boolean>(false);
	const [currentDate, setCurrentDate] = useState<Date | Date[]>(new Date());
	const [filtredCategories, setfiltredCategories] = useState<
		CategoryInterface[]
	>([]);

	useEffect(() => {
		setCategoryId(currentCategory._id);
		const cat = categories.filter(item => item.isExpense === isExpense);
		setfiltredCategories(cat);
	}, [currentCategory, categories, isExpense]);

	const onChangeHandler = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const value = event.target.value;
		setControl({
			...control,
			value,
			valid: validate(value, control.validation),
		});
		event.target.value = '';
	};

	const onKeyEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && control.valid) {
			const amount = +control.value;
			setControl({ ...control, value: '' });
			onAddTransaction(categoryId, amount, isExpense, currentDate);
		} else if (event.key === 'Enter' && !control.valid) {
			setControl({ ...control, value: '' });
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
				value={control.value}
				placeholder='Новая операция'
				class={control.class}
				type={control.type}
				valid={control.valid}
				touched={control.touched}
				shouldValidate={!!control.validation}
				onChange={onChangeHandler}
				onKeyPress={onKeyEnter}
			/>
			<Select
				items={filtredCategories}
				// type="category"
				initialId={currentCategory._id}
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

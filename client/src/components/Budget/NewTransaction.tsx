import React, { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames';
import Calendar from 'react-calendar';
import {
	createControl,
	FormControl,
	validate,
} from '../../services/validations/form';
import { Input } from '../UI';
import calendar from '../../assets/img/calendar.svg';
import Select from '../UI/Select';
import { CategoryInterface } from '../../store/ducks/budget/types';
import { formatDate } from '../../services/utils/dateUtils';

interface Props {
	categories: CategoryInterface[];
	currentCategory: CategoryInterface;
	onAddTransaction(
		id: string,
		amount: number,
		isExpense: boolean,
		currentDate: Date | Date[]
	): void;
}

const NewTransaction: React.FC<Props> = props => {
	const [control, setControl] = useState<FormControl>(
		createControl(
			{ type: 'text', class: 'table' },
			{ required: true, isNumber: true, notNull: true }
		)
	);

	const [categoryId, setCategoryId] = useState<string>('');
	const [isExpense, setIsExpense] = useState<boolean>(true);
	const [calendarIsOpen, setCalendarIsOpen] = useState<boolean>(false);
	const [currentDate, setCurrentDate] = useState<Date | Date[]>(new Date());

	useEffect(() => {
		setCategoryId(props.currentCategory._id);
	}, []);

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
			props.onAddTransaction(categoryId, amount, isExpense, currentDate);
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
				class={control.class}
				type={control.type}
				valid={control.valid}
				touched={control.touched}
				shouldValidate={!!control.validation}
				onChange={onChangeHandler}
				onKeyPress={onKeyEnter}
			/>
			<Select
				categories={props.categories}
				items={props.categories}
				type="category"
				initialId={categoryId}
				onItemClick={setCurrentCategoryId}
			/>
			<div className="options">
				<div
					className={classNames('expense-toggle', { active: isExpense })}
					onClick={() => setIsExpense(true)}
				></div>
				<div
					className={classNames('expense-toggle', { active: !isExpense })}
					onClick={() => setIsExpense(false)}
				></div>
				<img src={calendar} alt="" onClick={onToggleCalendarHandler}></img>
			</div>

			{calendarIsOpen && (
				<Fragment>
					<div className="calendar">
						<div
							className="backdrop backdrop__modal"
							onClick={onToggleCalendarHandler}
						></div>
						<Calendar value={currentDate} onChange={onChangeDateHandler} />
					</div>
				</Fragment>
			)}
		</div>
	);
};

export default NewTransaction;

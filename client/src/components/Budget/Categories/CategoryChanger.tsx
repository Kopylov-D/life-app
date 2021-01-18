import React, { useRef, useEffect, useState, Fragment } from 'react';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import { CategoryInterface } from '../../../store/ducks/budget/types';
import Modal from '../../UI/Modal';
import Toggle from '../../UI/Toggle';
import { useInput } from '../../../hooks/input.hook';

export interface Params {
	value: string;
	type?: 'add' | 'change';
	isExpense: boolean;
	color?: string;
}

interface Props {
	title: string;
	category?: CategoryInterface;
	onClick(params: Params): void;
	onCloseClick(): void;
}

const CategoryChanger: React.FC<Props> = ({
	title,
	category,
	onClick,
	onCloseClick,
}) => {
	const input = useInput(
		{ initialValue: category ? category.name : '' },
		{ required: true }
	);
	const [isExpense, setIsExpense] = useState<boolean>(true);
	// const refInput = useRef();

	// useEffect(() => {
	//   refInput.current.focus();
	// }, []);

	useEffect(() => {
		if (category) {
			setIsExpense(category.isExpense);
		}
	}, []);

	const onOkClickHandler = () => {
		onClick({ value: input.value, isExpense });
	};

	const onEnterKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			onOkClickHandler();
		}
	};

	const onSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
	};

	return (
		<Fragment>
			<Modal
				title={title}
				class="category-changer"
				closeModal={onCloseClick}
				backdropType="black"
			>
				<form
					className="category-changer"
					onSubmit={e => {
						onSubmit(e);
					}}
				>
					<Input
						value={input.value}
						className="category-changer"
						type="text"
						valid={input.valid}
						touched={input.touched}
						placeholder="Имя категории"
						onChange={input.onChange}
						onKeyPress={e => onEnterKeyPress(e)}
					/>

					<Toggle
						colorPrimary="color-expense"
						colorSecondary="color-income"
						textPrimary="Расходы"
						textSecondary="Доходы"
						onSwitch={setIsExpense}
						flag={isExpense}
					/>

					<div className="category-changer__buttons">
						<Button
							color="primary"
							size="small"
							disabled={!input.valid}
							onClick={onOkClickHandler}
						>
							Ок
						</Button>
						<Button
							color="secondary"
							size="small"
							disabled={false}
							onClick={onCloseClick}
						>
							Отмена
						</Button>
					</div>
				</form>
			</Modal>
		</Fragment>
	);
};

export default CategoryChanger;

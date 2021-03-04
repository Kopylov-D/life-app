import React, { useEffect, useState } from 'react';
import { CategoryInterface } from '../../../store/ducks/budget/contracts/state';
import { useInput } from '../../../hooks/input.hook';
import { CategoryEditorParams } from '../../../types';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';
import Toggle from '../../UI/Toggle';

interface Props {
	title: string;
	category?: CategoryInterface;
	onClick(params: CategoryEditorParams): void;
	onCloseClick(): void;
}

const CategoryEditor: React.FC<Props> = ({ title, category, onClick, onCloseClick }) => {
	const input = useInput(
		{ initialValue: category ? category.name : '' },
		{ required: true }
	);
	const [isExpense, setIsExpense] = useState<boolean>(true);

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
		<Modal
			title={title}
			class="category-editor"
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
					className="category-editor"
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

				<div className="category-editor__buttons">
					<Button
						color="primary"
						size="small"
						disabled={!input.valid}
						onClick={onOkClickHandler}
					>
						Ок
					</Button>
					<Button color="secondary" size="small" disabled={false} onClick={onCloseClick}>
						Отмена
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default CategoryEditor;

import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteCategory,
	changeCategory,
	addCategory,
	getCategories,
} from '../../../store/ducks/budget/actions';
import {
	selectCategories,
	selectIsLoading,
} from '../../../store/ducks/budget/selectors';
import { CategoryInterface } from '../../../store/ducks/budget/types';
import Button from '../../UI/Button'
import  Loader from '../../UI/Loader';
import { Params } from '../Operations/OperationModal';
import CategoryItem from './CategoryItem';
import CategoryModal from './CategoryChanger';
import Table from '../Table';

const Categories: React.FC = () => {
	const dispatch = useDispatch();
	const categories = useSelector(selectCategories);
	const isLoading = useSelector(selectIsLoading);

	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
	const [newCategoryModalIsOpen, setNewCategoryModalIsOpen] = useState<boolean>(
		false
	);
	const [currentCategory, setCurrentCategory] = useState<
		CategoryInterface | undefined
	>();

	useEffect(() => {
		if (categories.length < 1) {
			dispatch(getCategories());
		}
	}, []);

	const onChangeCategoryHandler = (e: React.MouseEvent, id: string): void => {
		e.preventDefault();
		const currentCategory = categories.find(item => item._id === id);
		setCurrentCategory(currentCategory);
		setModalIsOpen(true);
	};

	const onDeleteCategoryHandler = async (id: string) => {
		dispatch(deleteCategory(id));
	};

	const onOkModalClick = (params: Params): void => {
		dispatch(
			changeCategory(
				currentCategory!._id,
				params.value,
				'red',
				params.isExpense
			)
		);
		setModalIsOpen(false);
	};

	const onOkNewCategoryModalClick = (params: Params): void => {
		addCategoryHandler(params.value, params.isExpense!);
		setNewCategoryModalIsOpen(false);
	};

	const onCancelModalClick = () => {
		setModalIsOpen(false);
	};

	const addCategoryHandler = async (name: string, isExpense: boolean) => {
		dispatch(addCategory(name, isExpense));
	};

	return (
		<Fragment>
			{isLoading ? (
				<Loader type='cube-grid' />
			) : (
				<div className="budget__categories">
					<Table class="budget-categories">
						{categories.map(item => (
							<CategoryItem
								key={item._id}
								_id={item._id}
								name={item.name}
								amount={item.amount}
								onChangeCategory={onChangeCategoryHandler}
								onDeleteCategory={onDeleteCategoryHandler}
							/>
						))}
					</Table>
					<Button
						// type="primary"
						color='primary'
						size="small"
						disabled={false}
						onClick={() => setNewCategoryModalIsOpen(toggle => !toggle)}
					>
						+
					</Button>

					{newCategoryModalIsOpen && (
						<CategoryModal
							title="Новая категория"
							onClick={onOkNewCategoryModalClick}
							onCloseClick={() => setNewCategoryModalIsOpen(false)}
						/>
					)}

					{modalIsOpen && (
						<CategoryModal
							title="Изменить категорию"
							category={currentCategory}
							onClick={onOkModalClick}
							onCloseClick={onCancelModalClick}
						/>
					)}
				</div>
			)}
		</Fragment>
	);
};

export default Categories;

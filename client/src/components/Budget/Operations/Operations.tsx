import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBudgetData } from '../../../store/ducks/budget/actions';
import {
	selectCategories,
	selectCurrentCategory,
	selectIsLoading,
	selectOptions,
	selectTransactions,
} from '../../../store/ducks/budget/selectors';
import OperationsTable from './OperationsTable';
import Loader from '../../UI/Loader';
import DatePanel from '../DatePanel';

interface Props {}

const Operations: React.FC<Props> = () => {
	const dispatch = useDispatch();

	const transactions = useSelector(selectTransactions);
	const categories = useSelector(selectCategories);
	const currentCategory = useSelector(selectCurrentCategory);
	const options = useSelector(selectOptions);
	const isLoading = useSelector(selectIsLoading);

	const changeDateHandler = (year: string, month: string) => {
		dispatch(getBudgetData(year, month));
	};

	return (
		<Fragment>
			<DatePanel changeDate={changeDateHandler} startDate={options.startDate} />
			{isLoading ? (
				<Loader type="cube-grid" />
			) : (
				<div>
					<OperationsTable
						transactions={transactions}
						categories={categories}
						currentCategory={currentCategory}
					/>
				</div>
			)}
		</Fragment>
	);
};

export default Operations;

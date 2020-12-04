import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Expense from '../components/Budget/Expense';
import Operations from '../components/Budget/Operations';
import { getBudgetData } from '../store/ducks/budget/actions';
import { selectCategoriesWithAmount, selectTransactions } from '../store/ducks/budget/selectors';
import { TransactionInterface } from '../store/ducks/budget/types';
import { RootState } from '../store/rootReducer';

const BudgetPage = () => {
	const dispatch = useDispatch();
	const transactions = useSelector(selectTransactions)
	// const categoriesWithAmount = useSelector(selectCategoriesWithAmount);

	const [month, setMonth] = useState<number>(new Date().getMonth());
	const [year, setYear] = useState<number>(new Date().getFullYear());

	useEffect(() => {
		dispatch(getBudgetData(2020, 10));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [year, month]);

	return (
		<div className="budget">
			{/* <Expense /> */}
			<Operations transactions={transactions}/>
		</div>
	);
};

export default BudgetPage;

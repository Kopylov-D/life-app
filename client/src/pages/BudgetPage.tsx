import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Expense from '../components/Budget/Expense';
import { getTransactionsData } from '../store/ducks/budget/actions';
import { RootState } from '../store/rootReducer';

const BudgetPage = () => {
	const dispatch = useDispatch();
	const { budget } = useSelector((state: RootState) => state);

	const history = useHistory()

	// console.log(history)

	const isExpense = history.location.pathname === '/budget/expense'
	let items = []
	console.log(isExpense)

	if (isExpense) {
		// items = budget.items(item => {

		// 	console.log(item)

		// })
	}

	// useEffect(() => {
	// 	dispatch(getTransactionsData());
	// }, []);

	console.log(budget)

	return (
		<div className="budget-page">
			<Expense data={budget.items}/>
		</div>
	);
};

export default BudgetPage;

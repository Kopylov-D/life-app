import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Expense from '../components/Budget/Expense';
import { RootState } from '../store/rootReducer';

const BudgetPage = () => {
	// const dispatch = useDispatch();

	const history = useHistory()

	// console.log(history)

	const isExpense = history.location.pathname === '/budget/expense'
	let items = []

	if (isExpense) {
		// items = budget.items(item => {

		// 	console.log(item)

		// })
	}

	// useEffect(() => {
	// 	dispatch(getTransactionsData());
	// }, []);


	return (
		<div className="budget-page">
			<Expense />
		</div>
	);
};

export default BudgetPage;

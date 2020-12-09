import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Expense from '../components/Budget/Expense';
import Operations from '../components/Budget/Operations';
import Menu from '../components/Menu';
import { getBudgetData } from '../store/ducks/budget/actions';

const menuItems = [
	{ to: '/budget/expense', title: 'Расходы', component: Expense },
	{ to: '/budget/income', title: 'Доходы', component: Expense },
	{ to: '/budget/operation', title: 'Операции', component: Operations },
];

const BudgetPage: React.FC<any> = props => {
	// const dispatch = useDispatch();
	// const [month, setMonth] = useState<number>(new Date().getMonth());
	// const [year, setYear] = useState<number>(new Date().getFullYear());

	// useEffect(() => {
	// dispatch(getBudgetData('2020', '11'));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [year, month]);

	let routes = (
		<Switch>
			{menuItems.map(item => (
				<Route key={item.to} path={item.to} component={item.component} />
			))}
		</Switch>
	);

	return (
		<BrowserRouter>
			<Menu items={menuItems} />
			<div className="budget">{routes}</div>
		</BrowserRouter>
	);
};

export default BudgetPage;

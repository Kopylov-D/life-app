import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Categories from '../components/Budget/Categories/Categories';
import Accounting from '../components/Budget/Accounting/Accounting';
import Operations from '../components/Budget/Operations/Operations';
import Reports from '../components/Budget/Reports/Reports';
import Menu from '../components/Menu';
import { getBudgetData } from '../store/ducks/budget/actions';

const menuItems = [
	{ to: '/budget/operation', title: 'Операции', component: Operations },
	{ to: '/budget/accounting', title: 'Расходы/Доходы', component: Accounting },
	{ to: '/budget/categories', title: 'Категории', component: Categories },
	{ to: '/budget/report', title: 'Отчеты', component: Reports },
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

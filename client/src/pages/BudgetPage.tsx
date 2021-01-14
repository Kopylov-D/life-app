import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Categories from '../components/Budget/Categories/Categories';
import Accounting from '../components/Budget/Accounting/Accounting';
import Operations from '../components/Budget/Operations/Operations';
import Reports from '../components/Budget/Reports/Reports';
import Menu from '../components/Menu';

const menuItems = [
	{ to: '/budget/operation', title: 'Операции', component: Operations },
	{ to: '/budget/accounting', title: 'Сводка', component: Accounting },
	{ to: '/budget/categories', title: 'Категории', component: Categories },
	{ to: '/budget/report', title: 'Отчеты', component: Reports },
];

const BudgetPage: React.FC = () => {
	let routes = (
		<Switch>
			{menuItems.map(item => (
				<Route key={item.to} path={item.to} component={item.component} />
			))}

			<Redirect to="/budget/operation" />
		</Switch>
	);

	return (
		<BrowserRouter>
			<Menu items={menuItems} />
			<div className="budget">
				<div className="budget__container">
					{routes}
				</div>
			</div>
		</BrowserRouter>
	);
};

export default BudgetPage;

import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Categories from '../components/Budget/Categories/Categories';
import Accounting from '../components/Budget/Accounting/Accounting';
import Operations from '../components/Budget/Operations/Operations';
import Reports from '../components/Budget/Reports/Reports';
import Menu from '../components/Menu';
import { Icons, MenuItem } from '../types';

const menuItems: MenuItem[] = [
	{ to: '/budget/operation', title: 'Операции', component: Operations, icon: Icons.operations},
	{ to: '/budget/accounting', title: 'Сводка', component: Accounting, icon: Icons.accounting },
	{ to: '/budget/categories', title: 'Категории', component: Categories, icon: Icons.categories },
	{ to: '/budget/report', title: 'Отчеты', component: Reports, icon: Icons.report },
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
			<div className="main__content">
				<div className="budget">
					{routes}
				</div>
			</div>
		</BrowserRouter>
	);
};

export default BudgetPage;

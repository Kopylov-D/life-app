import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Categories from '../components/Budget/Categories/Categories';
import Accounting from '../components/Budget/Accounting/Accounting';
import Operations from '../components/Budget/Operations/Operations';
import Reports from '../components/Budget/Reports/Reports';
import Menu from '../components/Menu';
import { Month } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { getBudgetData } from '../store/ducks/budget/actions';
import {
	selectCategoriesWithAmount,
	selectOptions,
	selectIsLoading,
} from '../store/ducks/budget/selectors';
import Select from '../components/UI/Select';
import YearChanger from '../components/Budget/YearChanger';

const menuItems = [
	{ to: '/budget/operation', title: 'Операции', component: Operations },
	{ to: '/budget/accounting', title: 'Сводка', component: Accounting },
	{ to: '/budget/categories', title: 'Категории', component: Categories },
	{ to: '/budget/report', title: 'Отчеты', component: Reports },
];

export const months: Month[] = [
	{ _id: '0', name: 'Январь' },
	{ _id: '1', name: 'Февраль' },
	{ _id: '2', name: 'Март' },
	{ _id: '3', name: 'Апрель' },
	{ _id: '4', name: 'Май' },
	{ _id: '5', name: 'Июнь' },
	{ _id: '6', name: 'Июль' },
	{ _id: '7', name: 'Август' },
	{ _id: '8', name: 'Сентябрь' },
	{ _id: '9', name: 'Октябрь' },
	{ _id: '10', name: 'Ноябрь' },
	{ _id: '11', name: 'Декабрь' },
	{ _id: '', name: 'Весь год' },
];

const BudgetPage: React.FC<any> = props => {

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
				<div className="budget__container">{routes}</div>
			</div>
		</BrowserRouter>
	);
};

export default BudgetPage;

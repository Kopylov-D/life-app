import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Menu from '../components/Menu';
import Backlog from '../components/Todos/Backlog/Backlog';
import { Board } from '../components/Todos/Board/Board';
import Issues from '../components/Todos/Issues/Issues';
import { MenuItem } from '../types';

const menuItems: Array<MenuItem> = [
	{ title: 'Доска', to: '/todos/board', component: Board },
	{ title: 'Бэклог', to: '/todos/backlog', component: Backlog },
	{ title: 'Задачи', to: '/todos/issues', component: Issues },
];

const TodosPage = () => {
	let routes = (
		<Switch>
			{menuItems.map(item => (
				<Route key={item.to} path={item.to} component={item.component} />
			))}

			<Redirect to="/todos/board" />
		</Switch>
	);
	return (
		<BrowserRouter>
			<Menu items={menuItems} />
			<div className="main__content">
				<div className="todos">{routes}</div>
			</div>
			;
		</BrowserRouter>
	);
};

export default TodosPage;

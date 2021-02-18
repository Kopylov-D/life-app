import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Menu from '../components/Menu';
import Backlog from '../components/Todos/Backlog/Backlog';
import { Board } from '../components/Todos/Board/Board';
import Issues from '../components/Todos/Issues/Issues';
// import Button from '../components/UI/Button';
import { ReactComponent as Arrow } from '../assets/icons/arrow-down-outline.svg';
import Loader from '../components/UI/Loader';
import { getTodosData } from '../store/ducks/todos/actions';
import { selectLoadingStatus } from '../store/ducks/todos/selectors';
import { LoadingStatus } from '../store/types';
import { Icons, MenuItem } from '../types';
import Icon from '../components/UI/Icons/Icon';

const menuItems: MenuItem[] = [
	{ title: 'Доска', to: '/todos/board', component: Board, icon: Icons.board },
	{ title: 'Бэклог', to: '/todos/backlog', component: Backlog, icon: Icons.backlog },
	{ title: 'Задачи', to: '/todos/issues', component: Issues, icon: Icons.issues },
];

const TodosPage = () => {
	const dispatch = useDispatch();
	const loading = useSelector(selectLoadingStatus);
	const [menuIsOpen, setMenuIsOpen] = useState(true);

	const toggleMenu = () => {
		setMenuIsOpen(!menuIsOpen);
	};

	useEffect(() => {
		dispatch(getTodosData());
	}, []);

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
			<Menu items={menuItems} isOpen={menuIsOpen} />
			<div
				className="main__toggle-menu"
				style={{ left: menuIsOpen ? '240px' : 0 }}
				onClick={toggleMenu}
			>
				<Icon name="arrow" direction={menuIsOpen ? 'left' : 'right'}>
					<Arrow />
				</Icon>

				{/* <Button onClick={toggleMenu} type='toggle'>-</Button> */}
			</div>
			<div className="main__content" style={{ left: menuIsOpen ? '253px' : 0 }}>
				{loading === LoadingStatus.LOADING ? (
					<Loader size="small" type="cube-grid" />
				) : (
					<div className="todos">{routes}</div>
				)}
			</div>
			;
		</BrowserRouter>
	);
};

export default TodosPage;

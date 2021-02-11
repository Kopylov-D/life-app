import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Auth from './containers/Auth';
import { autoLogin } from './store/ducks/auth/actions';
import Main from './containers/Main';
import BudgetPage from './pages/BudgetPage';
import NotesPage from './pages/NotesPage';
import TodosPage from './pages/TodosPage';
import StatisticPage from './pages/StatisticPage';

import './scss/app.scss';
import Alert from './components/UI/Alert';
import { selectIsAuth } from './store/ducks/auth/selectors';

function App() {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectIsAuth);

	useEffect(() => {
		dispatch(autoLogin());
	}, []);

	let routes = (
		<Switch>
			<Route path="/login" component={Auth} />
			<Route path="/registration" component={Auth} />

			<Redirect to="/login" />
		</Switch>
	);

	if (isAuth) {
		routes = (
			<Main>
				<Switch>
					<Route path="/budget" component={BudgetPage} />
					<Route path="/notes" component={NotesPage} />
					<Route path="/todos" component={TodosPage} />
					<Route path="/statistic" component={StatisticPage} />

					<Redirect to="/todos" />
				</Switch>
			</Main>
		);
	}

	return (
		<div className="app">
			<BrowserRouter>
				<Alert />
				{routes}
			</BrowserRouter>
		</div>
	);
}

export default App;

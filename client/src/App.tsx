import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Auth from './containers/Auth';
import { RootState } from './store/rootReducer';
import { autoLogin } from './store/ducks/auth/actions';

import Main from './containers/Main';
import { BudgetPage, NotesPage, TodosPage, StatisticPage } from './pages';

import './scss/app.scss';

function App() {
	const { isAuth } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();
	

	useEffect(() => {
		dispatch(autoLogin());
	}, []);

	let routes = (
		<Switch>
			<Route path="/budget" component={BudgetPage} />
			<Route path="/notes" component={NotesPage} />
			<Route path="/todos" component={TodosPage} />
			<Route path="/statistic" component={StatisticPage} />

			<Redirect to="/" />
		</Switch>
	);

	if (!isAuth) {
		routes = (
			<Switch>
				<Route path="/budget" component={Auth} exact />

				<Redirect to="/" />
			</Switch>
		);
	}

	return (
		<div className="app">
			<BrowserRouter>{isAuth ? <Main>{routes}</Main> : <Auth />}</BrowserRouter>
		</div>
	);
}

export default App;

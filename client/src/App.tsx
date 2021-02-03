import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Auth from './containers/Auth';
import { RootState } from './store/rootReducer';
import { autoLogin } from './store/ducks/auth/actions';
import Main from './containers/Main';
import BudgetPage from './pages/BudgetPage';
import NotesPage from './pages/NotesPage';
import TodosPage from './pages/TodosPage';
import StatisticPage from './pages/StatisticPage';

import './scss/app.scss';
import Alert from './components/UI/Alert';

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

			<Redirect to="/todos" />
		</Switch>
	);

	return (
		<div className="app">
			<BrowserRouter>
				<Alert />
				{isAuth ? <Main>{routes}</Main> : <Auth />}
			</BrowserRouter>
		</div>
	);
}

export default App;

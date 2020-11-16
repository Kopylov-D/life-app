import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Auth from './containers/Auth';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';
import { RootState } from './store/rootReducer';
import { autoLogin } from './store/ducks/auth/actions';

import './scss/app.scss';

function App() {
	const { isAuth } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(autoLogin());
	}, []);

	let routes = (
		<Switch>
			<Route path="/main" component={MainPage} />
			<Route path="/about" component={AboutPage} />

			<Redirect to="/main" />
		</Switch>
	);

	if (!isAuth) {
		routes = (
			<Switch>
				<Route path="/auth" component={Auth} exact />

				<Redirect to="/auth" />
			</Switch>
		);
	}

	return (
		<BrowserRouter>
			<div className="app">{routes}</div>
		</BrowserRouter>
	);
}

export default App;

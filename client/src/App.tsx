import React from 'react';
import './scss/app.scss';
import { Auth } from './pages';
import MainPage from './pages/MainPage';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AboutPage from './pages/AboutPage';

function App() {
	const isAuth: boolean = false;

	let routes = (
		<Switch>
			<Route path="/main" component={MainPage} />
			<Route path="/about" component={AboutPage} />
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

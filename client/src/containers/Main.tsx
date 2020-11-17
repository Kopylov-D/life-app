import React from 'react';
import { NavLink } from 'react-router-dom';
import { getAuthData } from '../api/httpApi';
import Header from '../components/Header';
import { Button } from '../components/UI';
import { useHttp } from '../hooks/http.hook';

const Main = (props: any) => {
	const { loading, request, error, clearError } = useHttp();

	const testHandler = async () => {
		const { jwtToken } = getAuthData();
		console.log(jwtToken);
		const data = await request('/api/budget/info', 'GET', null, {
			Authorization: `Bearer ${jwtToken}`,
		});
		console.log(data);
	};
	return (
		<div className="app">
			<Header />
			<Button disabled={false} type="primary" onClick={testHandler}>
				Тест
			</Button>
			<main>{props.children}</main>
			<footer>Шкала</footer>
		</div>
	);
};

export default Main;

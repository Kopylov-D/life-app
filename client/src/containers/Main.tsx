import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Expense from '../components/Budget/Accounting';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Menu from '../components/Menu';
import ModalTemplate from '../components/UI/ModalTemplate';
import { BudgetPage } from '../pages';

const Main = (props: any) => {
	// const routes = () => (
	// 	<Switch>
	// 		<Route path="/budget/expense" component={BudgetPage} />
	// 		<Route path="/budget/income" component={BudgetPage} />

	// 		<Redirect to="/"/>
	// 	</Switch>
	// );

	console.log(props.children)

	return (
		<div className="main">
			<Header />
			<main className="main__content">
				{/* <Menu /> */}
				{props.children}
			</main>
			<Footer />
			{/* <ModalTemplate>
				sdfdf
			</ModalTemplate> */}
		</div>
	);
};

export default Main;

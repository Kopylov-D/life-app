import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Menu from '../components/Menu';

const Main = (props: any) => {
	return (
		<div className="main">
			<Header />
			<main className="main__content">
				<Menu />
				<div className="main__component-frame">{props.children}</div>
			</main>
			<Footer />
		</div>
	);
};

export default Main;

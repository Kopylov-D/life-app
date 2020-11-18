import React, { useState } from 'react';
import { getAuthData } from '../api/httpApi';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Menu from '../components/Menu';
import { Button } from '../components/UI';
import { useHttp } from '../hooks/http.hook';

const Main = (props: any) => {
	const { loading, request, error, clearError } = useHttp();

	const [width, setWidth] = useState<number>(20);
	const [X, setX] = useState<number>(0);
	const [isResizing, setIsResizing] = useState<boolean>(false);
	const [pxInPercent, setPxInPercent] = useState<number>(0);

	function initialResize(e: React.MouseEvent) {
		setIsResizing(true);
		setX(e.clientX);
		const docWidth = document.documentElement.scrollWidth - 6;
		setPxInPercent(docWidth / 100);
	}

	function stopResize() {
		if (isResizing) {
			setIsResizing(false);
			// setSavedWidth(width);
		}
	}

	function resize(e: React.MouseEvent) {
		if (isResizing) {
			const currentX = e.clientX;
			setX(currentX);
			const delta = (currentX - X) / pxInPercent;
			setWidth(width => width + delta);
		}
	}

	const testHandler = async () => {
		const { jwtToken } = getAuthData();
		console.log(jwtToken);
		const data = await request('/api/budget/info', 'GET', null, {
			Authorization: `Bearer ${jwtToken}`,
		});
		console.log(data);
	};

	console.log(props.children.props.children[0]);

	return (
		<div className="main">
			<Header />
			<main
				className="main__content"
				onMouseUp={stopResize}
				onMouseMove={resize}
			>
				<Menu/>
				{/* <Button disabled={false} type="primary" onClick={testHandler}>
					Тест
				</Button> */}
				<div className="resizer" onMouseDown={initialResize}></div>

				<div className="component-frame">{props.children}</div>
			</main>

			<Footer />
		</div>
	);
};

export default Main;

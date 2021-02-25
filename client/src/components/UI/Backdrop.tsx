import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { BackdropInterface } from '../../types';

interface Props {
	onClick(): void;
	type?: 'black' | 'transparent';
}

const Backdrop: React.FC<Props> = ({ type = 'transparent', onClick }) => {
	const [flag, setflag] = useState(false);

	useEffect(() => {
		setflag(true);
		return setflag(false);
	});

	return ReactDOM.createPortal(
		// <CSSTransition
		// 	in={flag}
		// 	timeout={200}
		// 	classNames="backdrop"
		// >
			<div
				className={classNames('backdrop', { [`backdrop-${type}`]: type })}
				onClick={onClick}
			></div>,
		document.body
	);
};

export default Backdrop;

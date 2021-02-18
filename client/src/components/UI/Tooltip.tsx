import React, { Fragment, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { CoordinatesInterface } from '../../types';

interface Props {
	text?: string;
	rect?: string;
	// parentRef?: React.RefObject<HTMLElement>;
	selfRef?: React.RefObject<HTMLDivElement>;
	coords: CoordinatesInterface;
	direction?: string;
	isVisible?: boolean;
	// x: number;
	// y: number;
}

const Tooltip: React.FC<Props> = props => {
	const [isVisible, setIsVisible] = useState<boolean>(true);
	const [opacity, setOpacity] = useState<boolean>(true);
	// const [x, setX] = useState<number>(props.x);
	// const [y, setY] = useState<number>(props.y);

	let style = {
		left: props.coords.left + 'px',
		top: props.coords.top + 'px',
	};

	let tooltipBody = (
		<div ref={props.selfRef} className="tooltip" style={style}>
			{props.text}
		</div>
	);

	useEffect(() => {
		// const rect = props.parentRef?.current?.getBoundingClientRect();
		// if (x && y) {
		// setX(props.x);
		// setY(props.y);

		// style = {
		// 	left: x + window.scrollX + 'px',
		// 	top: y + window.scrollY + 'px',
		// };
		// }

		// if (!props.isVisible) {
		// 	tooltipBody = (<div></div>)
		// 	console.log(props.isVisible);

		// }

		return () => {};
	}, [props.isVisible]);

	// const show = (hoverRect: any) => {
	// 	const docWidth = document.documentElement.clientWidth;
	// 	const docHeight = document.documentElement.clientHeight;

	// 	let rx = hoverRect.x + hoverRect.width, // most right x
	// 		lx = hoverRect.x, // most left x
	// 		ty = hoverRect.y, // most top y
	// 		by = hoverRect.y + hoverRect.height; // most bottom y
	// };

	return ReactDOM.createPortal(tooltipBody, document.body);
};

const Tooltip1: React.FC<Props> = ({ children, text, direction, coords }) => {
	const tipRef = React.createRef<HTMLDivElement>();
	const [isVisible, setIsVisible] = useState(true);

	let style = {
		left: coords.left + 'px',
		top: coords.top + 'px',
	};
	// console.log(tipRef);

	function handleMouseEnter() {
		// if (tipRef) {
		// 	tipRef.current!.style.opacity = '1';
		// 	tipRef.current!.style.marginLeft = '20px';
		// }
		setIsVisible(true);
	}
	function handleMouseLeave() {
		// tipRef.current!.style.opacity = '0';
		setIsVisible(false);

		// tipRef.current!.style.marginLeft = '10px';
	}

	let tooltipBody = ReactDOM.createPortal(
		<div ref={tipRef} className={`tooltip__content ${direction || 'top'}`} style={style}>
			{text}
		</div>,
		document.body
	);

	return (
		<div
			className="tooltip"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{children}
			{isVisible &&
				// <div
				// 	// style={{ left: '100px', top: '20px' }}
				// 	className={`tooltip__content ${direction || 'top'}`}
				// 	ref={tipRef}
				// >
				// 	{text}
				// </div>
				tooltipBody}
		</div>
	);
};

export default Tooltip;

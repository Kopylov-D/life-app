import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface Props {
	text?: string;
	rect?: string;
	// parentRef?: React.RefObject<HTMLElement>;
	selfRef: React.RefObject<HTMLDivElement>;
	coords: any
	// x: number;
	// y: number;
}

const Tooltip: React.FC<Props> = props => {
	const [isVisible, setIsVisible] = useState<boolean>(true);
	// const [x, setX] = useState<number>(props.x);
	// const [y, setY] = useState<number>(props.y);

	console.log(props.coords);
	

	let style = {
		left: props.coords.left + 'px',
		top: props.coords.top + 'px',
	};

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

		return () => {};
	});

	// const show = (hoverRect: any) => {
	// 	const docWidth = document.documentElement.clientWidth;
	// 	const docHeight = document.documentElement.clientHeight;

	// 	let rx = hoverRect.x + hoverRect.width, // most right x
	// 		lx = hoverRect.x, // most left x
	// 		ty = hoverRect.y, // most top y
	// 		by = hoverRect.y + hoverRect.height; // most bottom y
	// };

	return ReactDOM.createPortal(
		<div ref={props.selfRef} className="tooltip" style={style}>
			text
		</div>,
		document.body
	);
};

export default Tooltip;

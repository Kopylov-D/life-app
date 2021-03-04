import React from 'react';
import ReactDOM from 'react-dom';
import { CoordinatesInterface } from '../../types';

interface Props {
	text: string;
	selfRef: React.RefObject<HTMLDivElement>;
	coords: CoordinatesInterface;
}

const Tooltip: React.FC<Props> = props => {
	let style = {
		left: props.coords.left + 'px',
		top: props.coords.top + 'px',
	};


	let tooltipBody = (
		<div ref={props.selfRef} className="tooltip" style={style}>
			{props.text}
		</div>
	);

	return ReactDOM.createPortal(tooltipBody, document.body);
};

export default Tooltip;

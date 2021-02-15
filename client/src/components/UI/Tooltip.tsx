import React, { useState } from 'react';

interface Props {
	text?: string;
	rect?: string;
	ref?: React.Ref<any>;
}

const Tooltip: React.FC<Props> = props => {
	const [isVisible, setIsVisible] = useState<boolean>(true);
	const [x, setX] = useState<number>(0);
	const [y, setY] = useState<number>(0);

	let style = {
		left: x + window.scrollX + 'px',
		top: y + window.scrollY + 'px',
	};

	const show = (hoverRect: any) => {
		const docWidth = document.documentElement.clientWidth;
		const docHeight = document.documentElement.clientHeight;

		let rx = hoverRect.x + hoverRect.width, // most right x
			lx = hoverRect.x, // most left x
			ty = hoverRect.y, // most top y
			by = hoverRect.y + hoverRect.height; // most bottom y
	};

	return (
		<div className="tooltip">
			text
		</div>
	);
};

export default Tooltip;

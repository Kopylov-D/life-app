import React, { useEffect, useState } from 'react';

interface Props {
	text?: string;
	rect?: string;
	parentRef?: React.RefObject<HTMLElement>;
}

const Tooltip: React.FC<Props> = props => {
	const [isVisible, setIsVisible] = useState<boolean>(true);
	const [x, setX] = useState<number>(0);
	const [y, setY] = useState<number>(0);

	useEffect(() => {
		const rect = props.parentRef?.current?.getBoundingClientRect();
		if (rect) {
			setX(rect.x);
			setY(rect.y);
		}

		return () => {};
	}, []);


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

	return <div className="tooltip" style={style}>text</div>;
};

export default Tooltip;

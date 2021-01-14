import { useState } from 'react';

const useResize = () => {
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
};

export default useResize;

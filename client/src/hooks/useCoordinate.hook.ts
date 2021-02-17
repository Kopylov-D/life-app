import { createRef, useEffect, useRef, useState } from 'react';
import { CoordinatesInterface } from '../types';

const useCoordinate = (
	// initialIsVisible: boolean,
	// parentRef?: React.RefObject<HTMLElement | null | undefined>,
	// childRef?: React.RefObject<HTMLElement | null | undefined>,
) => {
	const [isVisible, setIsVisible] = useState(false);
	const [coords, setCoords] = useState<CoordinatesInterface>({ left: 0, top: 0 });

	const childRef = createRef<HTMLDivElement>()
	const parentRef = useRef<HTMLDivElement>(null)

	const childRect = childRef.current?.getBoundingClientRect();
	const parentRect = parentRef.current?.getBoundingClientRect();

	console.log(childRef);
	

	

	// const hoverRect = parentRef?.current?.getBoundingClientRect();
	// const ttRect = childRef?.current?.getBoundingClientRect();

	// console.log(childRef);
	// console.log(coords);

	// console.log(hoverRect, ttRect);

	useEffect(() => {
		// const updateCoords = () => {
		// 	if (hoverRect && ttRect) {
		// 		let x = 0;
		// 		let y = 0;

		// 		const docWidth = document.documentElement.clientWidth;
		// 		const docHeight = document.documentElement.clientHeight;

		// 		let rx = hoverRect.x + hoverRect.width; // most right x
		// 		let lx = hoverRect.x; // most left x
		// 		let ty = hoverRect.y; // most top y
		// 		let by = hoverRect.y + hoverRect.height; // most bottom y

		// 		console.log(rx, lx, ty, by);

		// 		// tool tip rectange
		// 		// let ttRect = ttNode.getBoundingClientRect();

		// 		let bRight = rx + ttRect.width <= window.scrollX + docWidth;
		// 		let bLeft = lx - ttRect.width >= 0;

		// 		let bAbove = ty - ttRect.height >= 0;
		// 		let bBellow = by + ttRect.height <= window.scrollY + docHeight;

		// 		// let newState = {};

		// 		// the tooltip doesn't fit to the right
		// 		if (bRight) {
		// 			x = rx;
		// 			y = ty + (hoverRect.height - ttRect.height);
		// 			if (y < 0) {
		// 				y = ty;
		// 			}

		// 			// newState.type = "right";
		// 		} else if (bBellow) {
		// 			y = by;

		// 			x = lx + (hoverRect.width - ttRect.width);

		// 			if (x < 0) {
		// 				x = lx;
		// 			}

		// 			// newState.type = "bottom";
		// 		} else if (bLeft) {
		// 			x = lx - ttRect.width;

		// 			y = ty + (hoverRect.height - ttRect.height);

		// 			if (y < 0) {
		// 				y = ty;
		// 			}

		// 			// newState.type = "left";
		// 		} else if (bAbove) {
		// 			y = ty - ttRect.height;

		// 			x = lx + (hoverRect.width - ttRect.width);

		// 			if (x < 0) {
		// 				x = lx;
		// 			}

		// 			// newState.type = "top";
		// 		}

		// 		// newState = {...newState, x:x, y:y};

		// 		// this.setState(newState);
		// 		setX(x);
		// 		setY(y);
		// 	}
		// };

		// if (hoverRect) {
		const update = () => {
			// const hoverRect = parentRef?.current?.getBoundingClientRect();


			if (parentRect && childRect) {
				setCoords({
					left: parentRect.x - parentRect.width / 2, // add half the width of the button for centering
					top: parentRect.y + window.scrollY - childRect.height, // add scrollY offset, as soon as getBountingClientRect takes on screen coords
				});
				// console.log(childRef);
				console.log(parentRect);
			}
		};

		

		update();

		// 		console.log('hoverRect', hoverRect);

		// 	};
		// if (parentRef) {
		// 	setRect(parentRef.current?.getBoundingClientRect());
		// }

		// window.addEventListener('resize', update);

		// return () => window.removeEventListener('resize', update);

		// if (rect) {
		// 	setX(rect.x);
		// 	setY(rect.y);
		// }

		// console.log(hoverRect);
	}, [parentRef]);

	// const handleHideDropdown = (event: KeyboardEvent) => {
	// 	if (event.key === key) {
	// 		setIsVisible(false);
	// 	}
	// };

	// const handleClickOutside = (event: MouseEvent) => {
	// 	if (ref !== null && ref.current && !ref.current.contains(event.target)) {
	// 		setIsVisible(false);
	// 	}
	// };

	// useEffect(() => {
	// 	console.log('x', X, 'y', Y);

	// 	// document.addEventListener('keydown', handleHideDropdown, true);
	// 	// document.addEventListener('mousedown', handleClickOutside, true);
	// 	return () => {
	// 		// document.removeEventListener('keydown', handleHideDropdown, true);
	// 		// document.removeEventListener('mousedown', handleClickOutside, true);
	// 	};
	// }, [X, Y]);

	return { coords, isVisible, setIsVisible, childRef, parentRef };
};

export default useCoordinate;

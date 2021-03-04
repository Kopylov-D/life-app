import { useEffect, useRef, useState } from 'react';
import { CoordinatesInterface, Placement } from '../types';

const setPlacement = (
	parentRect: any,
	childRect: any,
	placement: Placement = Placement.auto
): CoordinatesInterface => {
	let left: CoordinatesInterface['left'] = 0;
	let top: CoordinatesInterface['top'] = 0;

	if (placement === Placement.bottomLeft) {
		left = parentRect.left - childRect.width + parentRect.width;
		top = parentRect.top + parentRect.height;
	}

	if (placement === Placement.bottom) {
		left = parentRect.left;
		top = childRect.top;
	}

	if (placement === Placement.top) {
		left = parentRect.x;
		top = parentRect.y + window.scrollY - childRect.height;
	}

	if (placement === Placement.auto) {
		left = parentRect.x;
		top = parentRect.y + window.scrollY - childRect.height;
		let rightBorder = left + childRect.width;
		let clientWidth = document.documentElement.clientWidth;

		if (left < 0) left = 0;
		if (rightBorder > clientWidth) {
			left = clientWidth - childRect.width - 5;
		}
	}

	return { left, top };
};

const useCoordinate = (placement?: Placement) => {
	const [isVisible, setIsVisible] = useState(false);
	const [coords, setCoords] = useState<CoordinatesInterface>({ left: -200, top: -200 });

	const childRef = useRef<HTMLDivElement>(null);
	const parentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isVisible) {
			setCoords({ left: -200, top: -200 });
		}
		updateCoords();
	}, [isVisible]);

	const updateCoords = () => {
		let parentRect = parentRef.current?.getBoundingClientRect();
		let childRect = childRef.current?.getBoundingClientRect();

		// if (parentRect && !childRect) {
		// 	setCoords({ left: parentRect.x, top: parentRect.y + parentRect.height });
		// }

		if (parentRect && childRect) {
			let coords = setPlacement(parentRect, childRect, placement);
			setCoords(coords);
		}
	};

	return {
		coords,
		isVisible,
		setIsVisible,
		childRef,
		parentRef,
		updateCoords,
	};
};

export default useCoordinate;

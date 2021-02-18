import { useEffect, useRef, useState } from 'react';
import { CoordinatesInterface } from '../types';

const useCoordinate = () =>
	// initialIsVisible: boolean,
	// parentRef1?: React.RefObject<HTMLElement | null | undefined>,
	// childRef?: React.RefObject<HTMLElement | null | undefined>,
	{
		const [isVisible, setIsVisible] = useState(false);
		const [coords, setCoords] = useState<CoordinatesInterface>({ left: 0, top: 0 });

		// const [childRect, setchildRect] = useState<any>();
		// const [parentRect, setparentRect] = useState<any>();

		const childRef = useRef<HTMLDivElement>(null);
		const parentRef = useRef<HTMLDivElement>(null);

		useEffect(() => {
			const update = () => {
				const parentRect = parentRef.current?.getBoundingClientRect();
				if (parentRect) {
					console.log(parentRect);

					setCoords({
						left: parentRect.x, // - parentRect.width / 2, // add half the width of the button for centering
						top: parentRect.y + parentRect.height, // add scrollY offset, as soon as getBountingClientRect takes on screen coords
					});
				}

				// if (parentRect && childRect) {
				// 	setCoords({
				// 		left: parentRect.x - parentRect.width / 2, // add half the width of the button for centering
				// 		top: parentRect.y + window.scrollY - childRect.height, // add scrollY offset, as soon as getBountingClientRect takes on screen coords
				// 	});
				// }
			};

			document.addEventListener('scroll', update);
			update();
		}, [parentRef, childRef]);

		// useEffect(() => {
		// 	setchildRect(childRef.current?.getBoundingClientRect());
		// 	setparentRect(parentRef.current?.getBoundingClientRect());
		// }, [childRef, parentRef]);

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

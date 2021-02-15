import { forwardRef, useEffect, useRef, useState } from "react";

const useCoordinate = (initialIsVisible: boolean, myRef?: React.RefObject<HTMLElement | null | undefined>, key?: string) => {
	const [isVisible, setIsVisible] = useState(initialIsVisible);
	const ref = useRef<any>(null);


	const rect = myRef?.current?.getClientRects()
	console.log(myRef);
	console.log(rect);
	

	const handleHideDropdown = (event: KeyboardEvent) => {
		if (event.key === key) {
			setIsVisible(false);
		}
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (ref !== null && ref.current && !ref.current.contains(event.target)) {
			setIsVisible(false);
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleHideDropdown, true);
		document.addEventListener('mousedown', handleClickOutside, true);
		return () => {
			document.removeEventListener('keydown', handleHideDropdown, true);
			document.removeEventListener('mousedown', handleClickOutside, true);
		};
	});

	return { ref, isVisible, setIsVisible };
}

export default useCoordinate
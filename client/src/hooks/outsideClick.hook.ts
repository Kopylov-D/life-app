import { useEffect, useRef, useState } from 'react';

export default function useOutsideClick(initialIsVisible: boolean, key?: string) {
	const [isVisible, setIsVisible] = useState(initialIsVisible);
	const ref = useRef<any>(null);

	const onHide = (event: KeyboardEvent) => {
		if (event.key === key) {
			setIsVisible(false);
		}
	};

	const onClickOutside = (event: MouseEvent) => {
		if (ref !== null && ref.current && !ref.current.contains(event.target)) {
			setIsVisible(false);
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', onHide, true);
		document.addEventListener('mousedown', onClickOutside, true);
		return () => {
			document.removeEventListener('keydown', onHide, true);
			document.removeEventListener('mousedown', onClickOutside, true);
		};
	});

	return { ref, isVisible, setIsVisible };
}

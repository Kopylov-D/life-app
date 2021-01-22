import { useEffect, useRef, useState } from 'react';

// const useOutsideAlert = (ref: any) => {
// 	useEffect(() => {
// 		function handleClickOutside(event: any) {
// 			if (ref!.current && !ref.current.contains(event.target)) {
// 				alert('You clicked outside of me!');
// 			}
// 		}

// 		document.addEventListener('mousedown', handleClickOutside);
// 		return () => {
// 			document.removeEventListener('mousedown', handleClickOutside);
// 		};
// 	}, [ref]);
// };

// export default function OutsideAlerter(props: any) {
// 	const wrapperRef = useRef<any>(null);
// 	useOutsideAlert(wrapperRef);

// 	return;
// }

function useOutsigjdeClick(initialFlag: boolean) {
	const [flag, setFlag] = useState<boolean>(initialFlag);
	const ref = useRef<any>();

	const handleClickOutside = (event: any) => {
		if (ref !== null && ref.current && !ref.current.contains(event.target)) {
			setFlag(false);
			console.log(ref);
			console.log(event.target);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	return { ref, flag, setFlag };
}

export default function useOutsideClick(initialIsVisible: boolean, key?: string) {
	const [isVisible, setIsVisible] = useState(initialIsVisible);
	const ref = useRef<any>(null);

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
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('keydown', handleHideDropdown, true);
			document.removeEventListener('click', handleClickOutside, true);
		};
	});

	return { ref, isVisible, setIsVisible };
}

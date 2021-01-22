import React, { useEffect, useState } from 'react';
import useOutsideClick from '../../hooks/outsideAlert.hook';

export interface SelectItems {
	id: string;
	value: string;
}

interface Props {
	items: SelectItems[];
	initialId?: string;
	initialValue?: string;
	onItemClick(id: string): void;
}

const Select: React.FC<Props> = ({
	items,
	initialId,
	onItemClick,
	initialValue = '',
}) => {
	const [label, setLabel] = useState<string>(initialValue);
	const { ref, isVisible, setIsVisible } = useOutsideClick(false);

	useEffect(() => {
		if (initialId && items.length > 0) {
			const item = items.find(item => item.id === initialId);
			if (item) {
				setLabel(item.value);
			} else {
				setLabel(items[0].value);
				onItemClick(items[0].id);
			}
		}
	}, [items]);

	const toggleDropdown = () => {
		setIsVisible(!isVisible);
	};

	const onClickHandler = (id: string) => {
		onItemClick(id);
		toggleDropdown();
		const currentItem = items.find(item => item.id === id);
		setLabel(currentItem!.value);
	};

	return (
		<div className="select" ref={ref}>
			<div className="select__input" onClick={toggleDropdown}>
				<span>{label}</span>
				<span className="material-icons">{`arrow_drop_${
					isVisible ? 'up' : 'down'
				}`}</span>
			</div>

			{isVisible && (
				<div className="select__dropdown">
					{items &&
						items.map(item => (
							<li key={item.id} onClick={() => onClickHandler(item.id)}>
								{item.value}
							</li>
						))}
				</div>
			)}
		</div>
	);
};

export default Select;

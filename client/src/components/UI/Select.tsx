import React, { Fragment, useEffect, useState } from 'react';
import { Selector } from '../../types';

interface Props extends Selector {
	// items: props.type[];
	type: 'month' | 'year' | 'category';
	initialId: string;
	// onItemClick(id: number | string): void;
	onItemClick(id: string): void;
}

// export type Select = ReturnType<typeof rootReducer>;

const Select: React.FC<Props> = ({
	// months,
	// years,
	// categories,
	type,
	items,
	initialId,
	onItemClick,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	// const [label, setLabel] = useState<string | number>('');
	const [label, setLabel] = useState<string>('');

	// useEffect(() => {
	// 	if (type === 'month' && months) {
	// 		setLabel(months[initialLabel].name);
	// 	}
	// 	if (type === 'year') {
	// 		setLabel(initialLabel);
	// 	}
	// 	if (type === 'category' && categories) {
	// 		const currentItem = categories.find(item => item.isSelected);
	// 		if (currentItem) {
	// 			setLabel(currentItem.name);
	// 		} else {
	// 			setLabel('categories[0]');
	// 		}
	// 	}
	// }, []);

	useEffect(() => {
		if (initialId) {
			const item = items.find(item => item._id === initialId);
			item && setLabel(item.name);
		} else {
		setLabel(type);
		}
	}, []);

	const toggleDropdown = () => {
		setIsOpen(isOpen => !isOpen);
	};

	const onClickHandler = (id: string) => {
		onItemClick(id);
		toggleDropdown();
		// if (items) {
		const currentItem = items.find(item => item._id === id);
		setLabel(currentItem!.name);
		// }
	};
	// const onClickHandler = (id: number | string) => {
	// 	onItemClick(id);
	// 	toggleDropdown();
	// 	if (type === 'month' && months && typeof id === 'number') {
	// 		setLabel(months![id].name);
	// 	}
	// 	if (type === 'year') {
	// 		setLabel(id);
	// 	}
	// 	if (type === 'category') {
	// 		const currentCategory = categories?.find(item => item._id === id)
	// 		setLabel(currentCategory!.name)
	// 		console.log(id)
	// 	}
	// };

	return (
		<div className="select">
			<div className="select__input" onClick={toggleDropdown}>
				<span>{label}</span>
				<i>х</i>
			</div>

			{isOpen && (
				<Fragment>
					<div
						className="backdrop backdrop__select"
						onClick={toggleDropdown}
					></div>
					<div className="select__dropdown">
						{items &&
							items.map(item => (
								<li key={item._id} onClick={() => onClickHandler(item._id)}>
									{item.name}
								</li>
							))}
					</div>
					{/* <div className="select__dropdown">
						{months &&
							months.map(month => (
								<li key={month.id} onClick={() => onClickHandler(month.id)}>
									{month.name}
								</li>
							))}
						{years &&
							years.map(year => (
								<li key={year} onClick={() => onClickHandler(year)}>
									{year}
								</li>
							))}
						{categories &&
							categories.map(category => (
								<li
									key={category._id}
									onClick={() => onClickHandler(category._id)}
								>
									{category.name}
								</li>
							))}
					</div> */}
				</Fragment>
			)}
		</div>
	);
};

export default Select;

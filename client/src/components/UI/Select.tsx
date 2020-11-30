import React, { Fragment, useEffect, useState } from 'react';
import { Selector } from '../../types';

interface Props extends Selector {
	// items: props.type[];
	type: 'month' | 'year';
	initialLabel: number;
	onItemClick(id: number | string): void;
}

// export type Select = ReturnType<typeof rootReducer>;

const Select: React.FC<Props> = ({
	months,
	years,
	type,
	initialLabel,
	onItemClick,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [label, setLabel] = useState<string | number>('');

	useEffect(() => {
		if (type === 'month' && months ) {
			setLabel(months[initialLabel].name)
		} else {
			setLabel(initialLabel)
		}
	}, [])

	const toggleDropdown = () => {
		setIsOpen(isOpen => !isOpen);
	};

	const onClickHandler = (item: number) => {
		onItemClick(item);
		toggleDropdown();
		if (type === 'month') {
			setLabel(months![item].name);
		}
		if (type === 'year') {
			setLabel(item);
		}
	};

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
						{months &&
							months.map(month => (
								<li key={month.id} onClick={() => onClickHandler(month.id)}>
									{month.name}
								</li>
							))}
						{years &&
							years.map(year => (
								<li key={year} onClick={() => onClickHandler(year)}>
									{year}{' '}
								</li>
							))}
					</div>
				</Fragment>
			)}
		</div>
	);
};

export default Select;

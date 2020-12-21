import React, { Fragment, useEffect, useState } from 'react';
import { Selector } from '../../types';
import Backdrop from './Backdrop';

interface Props extends Selector {
	// items: props.type[];
	type: 'month' | 'year' | 'category';
	initialId: string;
	onItemClick(id: string): void;
}

// export type Select = ReturnType<typeof rootReducer>;

const Select: React.FC<Props> = ({ type, items, initialId, onItemClick }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [label, setLabel] = useState<string>('');

	useEffect(() => {
		if (initialId && items.length > 0) {
			const item = items.find(item => item._id === initialId);
			console.log(items)
			item && setLabel(item.name) 
			
		}
	}, [items]);

	const toggleDropdown = () => {
		setIsOpen(isOpen => !isOpen);
	};

	const onClickHandler = (id: string) => {
		onItemClick(id);
		toggleDropdown();
		const currentItem = items.find(item => item._id === id);
		setLabel(currentItem!.name);
	};

	return (
		<Fragment>
			<div className="select">
				<div className="select__input" onClick={toggleDropdown}>
					<span>{label}</span>
					<span className="material-icons">{`arrow_drop_${isOpen ? 'up' : 'down'}`}</span>
				</div>

				{isOpen && (
					<Fragment>
						<div className="select__dropdown">
							{items &&
								items.map(item => (
									<li key={item._id} onClick={() => onClickHandler(item._id)}>
										{item.name}
									</li>
								))}
						</div>
					</Fragment>
				)}
			</div>
			{isOpen && <Backdrop onClick={toggleDropdown} />}
		</Fragment>
	);
};

export default Select;

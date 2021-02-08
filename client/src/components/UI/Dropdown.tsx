import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

type Item = {
	id: string | number;
	name: string;
	isSelected?: boolean;
};

type Props = {
	items: Item[];
	onClick(id: number | string): void;
	value?: string | number;
};

const Dropdown: React.FC<Props> = ({ items, value, onClick }) => {
	const [headerTitle, setHeaderTitle] = useState<string>('');
	const [isOpen, seIsOpen] = useState<boolean>(false);
	const [selectedId, setSelectedId] = useState<string | number | undefined>(value);

	useEffect(() => {
		// const currentItem = items.find(item => item.isSelected);
		// if (currentItem) {
		// 	setHeaderTitle(currentItem.name);
		// } else {
		// 	setHeaderTitle(items[0].name);
		// }
		setSelectedId(value)
	}, [value]);

	return (
		<div className="dropdown">
			{/* <div className="dropdown__header">{headerTitle}</div> */}
			<ul className="dropdown__content">
				{items.map(item => {
					return (
						<li
							className={classNames('dropdown__item', {
								['dropdown__item--active']: item.id === selectedId,
							})}
							key={item.id}
							onClick={() => onClick(item.id)}
						>
							{item.name}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Dropdown;

import React, { useEffect, useState } from 'react';

type Item = {
	id: string;
	title: string;
	isSelected: boolean;
	onClick(): void;
};

type Props = {
	items: Item[];
};

const Dropdown: React.FC<Props> = ({ items }) => {
  const [headerTitle, setHeaderTitle] = useState<string>('');
  const [isOpen, seIsOpen] = useState<boolean>(false)

	useEffect(() => {
		const currentItem = items.find(item => item.isSelected);
		if (currentItem) {
			setHeaderTitle(currentItem.title);
		} else {
			setHeaderTitle(items[0].title);
		}
	}, []);

	return (
		<div className="dropdown">
			<div className="dropdown__header">{headerTitle}</div>
			<ul className="dropdown__content">
				{items.map(item => {
					return (
						<li className="dropdown__item" key={item.id}>
							{item.title}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Dropdown;

import React, { useState } from 'react';
import classNames from 'classnames';
import arrow from '../assets/icons/Arrow-down.svg';

interface Props {
	id: string
	name: string;
	onHeaderItemClick?(name: string, direction: string): void;
	needSort: boolean
	isActive: boolean
	// isActive?: boolean
}

const TableHeaderItem: React.FC<Props> = ({ id, name, needSort, isActive, onHeaderItemClick }) => {
	// const [hasSort, setHasSort] = useState<boolean>(needSort);
	// const [isActive, setIsActive] = useState<boolean>(false);
	const [direction, setDirection] = useState<'asc' | 'desc'>('asc');

	const onClick = () => {
		if (needSort) {
			onHeaderItemClick!(id, direction);
			// setIsActive(true)
			direction === 'asc' ? setDirection('desc') : setDirection('asc');
		}
	};

	return (
		<div className={classNames('table__header-item', { active: isActive })} onClick={onClick}>
			<span>{name}</span>
			{needSort && isActive && (
				<img
					className={classNames('arrow', { 'arrow--down': direction === 'desc' }, { 'arrow--up': direction === 'asc' })}
					src={arrow}
					alt=""
				/>
			)}
		</div>
	);
};

export default TableHeaderItem;

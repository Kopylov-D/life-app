import React, { useState } from 'react';
import classNames from 'classnames';
import arrow from '../assets/icons/Arrow-down.svg';
import TableHeaderItem from './TableHeaderItem';

export interface HeaderItemsInterface {
	id: string
	name: string
	needSort: boolean
	isActive: boolean
}

type Props = {
	class: string;
	headerItems?: HeaderItemsInterface[];
	onHeaderItemClick?(name: string, direction: string): void;
	// isActive?: boolean
};

const Table: React.FC<Props> = props => {
	return (
		<div
			className={classNames('table', {
				[`${props.class}__table`]: props.class,
			})}
		>
			{props.headerItems && (
				<header
					className={classNames(
						{
							[`${props.class}__table`]: props.class,
						},
						'table__header'
					)}
				>
					{props.headerItems.map((item, index) => (
						<TableHeaderItem
							key={index}
							// name={item.name}
							// needSort={item.needSort}
							{...item}
						  onHeaderItemClick={props.onHeaderItemClick}
							// isActive={props.isActive}
						/>
					))}
				</header>
			)}

			<div
				className={classNames('table__body', {
					[`${props.class}__table`]: props.class,
				})}
			>
				{props.children}
			</div>
		</div>
	);
};

export default Table;

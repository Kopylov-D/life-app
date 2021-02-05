import React, { useState } from 'react';
import classNames from 'classnames';
import arrow from '../assets/icons/Arrow-down.svg';
import TableHeaderItem from './TableHeaderItem';

type Props = {
	class: string;
	headerItems?: string[];
	onHeaderItemClick?(direction: string): void;
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
							name={item}
							onHeaderItemClick={props.onHeaderItemClick}
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

import React, { useState } from 'react';
import classNames from 'classnames';
import Loader from './Loader';

type Props = {
	onClick: () => void;
	disabled?: boolean;
	isLoading?: boolean;
	type?: 'count' | 'toggle';
	color?: 'primary' | 'secondary' | 'danger';
	size?: 'small' | 'large';
};

const Button: React.FC<Props> = ({
	disabled = false,
	isLoading,
	type,
	color,
	size,
	children,
	onClick,
}) => {

	return (
		<button
			className={classNames(
				'btn',
				{ [`btn-${size}`]: size },
				{ [`btn-${type}`]: type },
				`${color}`
			)}
			onClick={onClick}
			disabled={disabled}
		>
			{isLoading ? <Loader size="small" /> : children}
		</button>
	);
};

export default Button;

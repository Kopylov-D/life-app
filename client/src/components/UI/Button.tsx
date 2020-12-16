import React from 'react';
import classNames from 'classnames';
import Loader from './Loader';

type Props = {
	onClick: () => void;
	disabled: boolean;
	isLoading?: boolean;
	type: 'primary' | 'secondary';
	size?: 'small' | 'large';
};

const Button: React.FC<Props> = ({
	disabled,
	isLoading,
	type,
	size,
	children,
	onClick,
}) => {
	return (
		<button
			className={classNames('btn', { [`btn-${size}`]: size }, `${type}`)}
			onClick={onClick}
			disabled={disabled}
		>
			{isLoading ? <Loader /> : children}
		</button>
	);
};

export default Button;

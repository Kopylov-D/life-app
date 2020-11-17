import React from 'react';
import classNames from 'classnames';

import Loader from './Loader'

type Props = {
	onClick: () => void;
	disabled: boolean;
  isLoading?: boolean;
  type: 'primary' | 'secondary'
};
const Button: React.FC<Props> = props => {
	return (
		<button
			className={classNames('button', `${props.type}`)}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			{props.isLoading ? <Loader /> : props.children}
		</button>
	);
};

export default Button;

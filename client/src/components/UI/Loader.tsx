import classNames from 'classnames';
import React from 'react';

type Props = {
	size?: 'small' | 'normal';
	type?: 'spinner' | 'circle';
};

const Loader: React.FC<Props> = ({ size = 'normal', type = 'spinner' }) => {

	return (
		<div className={classNames(`lds-${type}`, `lds-${type}-${size}`, `lds-${type}-primary`)}>
			{}
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default Loader;

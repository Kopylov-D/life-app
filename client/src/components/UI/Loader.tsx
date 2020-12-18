import classNames from 'classnames';
import React from 'react';

type Props = {
	size?: 'small' | 'normal';
	type?: 'spinner' | 'circle';
};

const Loader: React.FC<Props> = ({ size = 'normal', type = 'spinner' }) => {
	return (
		// <div className={classNames(`lds-${type}`, `lds-${type}-${size}`)}>
		// 	<div></div>
		// 	<div></div>
		// 	<div></div>
		// 	<div></div>
		// 	<div></div>
		// 	<div></div>
		// 	<div></div>
		// 	<div></div>
		// </div>
		<div className="sk-cube-grid">
			<div className="sk-cube sk-cube-1"></div>
			<div className="sk-cube sk-cube-2"></div>
			<div className="sk-cube sk-cube-3"></div>
			<div className="sk-cube sk-cube-4"></div>
			<div className="sk-cube sk-cube-5"></div>
			<div className="sk-cube sk-cube-6"></div>
			<div className="sk-cube sk-cube-7"></div>
			<div className="sk-cube sk-cube-8"></div>
			<div className="sk-cube sk-cube-9"></div>
		</div>
	);
};

export default Loader;

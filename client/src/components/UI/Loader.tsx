import React, { useEffect } from 'react';
import classNames from 'classnames';

type Props = {
	size?: 'small' | 'normal';
	type?: 'spinner' | 'circle' | 'cube-grid';
};

const Loader: React.FC<Props> = ({ size = 'normal', type = 'spinner' }) => {
	useEffect(() => {}, []);

	const setLoader = () => {
		switch (type) {
			case 'spinner':
				return (
					<>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</>
				);
			case 'circle':
				return <div></div>;
			case 'cube-grid':
				return (
					<>
						<div className="sk-cube sk-cube-1"></div>
						<div className="sk-cube sk-cube-2"></div>
						<div className="sk-cube sk-cube-3"></div>
						<div className="sk-cube sk-cube-4"></div>
						<div className="sk-cube sk-cube-5"></div>
						<div className="sk-cube sk-cube-6"></div>
						<div className="sk-cube sk-cube-7"></div>
						<div className="sk-cube sk-cube-8"></div>
						<div className="sk-cube sk-cube-9"></div>
					</>
				);
		}
	};

	return (
		<div className="loader">
			<div className={classNames(`lds-${type}`, `lds-${type}-${size}`)}>
				{setLoader()}
			</div>
		</div>
	);
};

export default Loader;

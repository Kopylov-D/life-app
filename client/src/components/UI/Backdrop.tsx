import classNames from 'classnames';
import React from 'react';
import {BackdropInterface} from '../../types'

 interface Props extends BackdropInterface  {

};

const Backdrop: React.FC<Props> = ({ type, onClick }) => {
	return (
		<div
			className={classNames('backdrop', { [`backdrop-${type}`]: type })}
			onClick={onClick}
		></div>
	);
};

export default Backdrop;

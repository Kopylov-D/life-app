import React from 'react';
import classNames from 'classnames';
import { Colors } from '../../types';

interface Props {
	checked: boolean;
	value?: string;
	color?: Colors;
	onChangeHandler(): void;
}

const Checkbox: React.FC<Props> = ({ checked, value, color, onChangeHandler }) => {
	const idHtmlFor = Math.random().toString();

	return (
		<label htmlFor={idHtmlFor} className="checkbox">
			<input
				className="checkbox__real"
				id={idHtmlFor}
				type="checkbox"
				checked={checked}
				onChange={onChangeHandler}
			/>
			<span
				className={classNames('checkbox__custom', { [`checkbox--${color}`]: color })}
			></span>
			<span className="checkbox__text">{value}</span>
		</label>
	);
};

export default Checkbox;

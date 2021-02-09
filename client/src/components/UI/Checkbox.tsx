import React from 'react';

interface Props {
	// id: string;
	checked: boolean;
	value?: string;
	onChangeHandler(): void;
}

const Checkbox: React.FC<Props> = ({ checked, value, onChangeHandler }) => {

	const idHtmlFor = Math.random().toString()

	return (
		<label htmlFor={idHtmlFor} className="checkbox">
			<input
				className="checkbox__real"
				id={idHtmlFor}
				type="checkbox"
				checked={checked}
				onChange={onChangeHandler}
			/>
			<span className="checkbox__custom"></span>
      <span className="checkbox__text">{value}</span>
		</label>
	);
};

export default Checkbox;

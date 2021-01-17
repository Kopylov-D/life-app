import React from 'react';

interface Props {
	id: string;
	checked: boolean;
	value: string;
	onChangeHandler(id: string): void;
}

const Checkbox: React.FC<Props> = ({ id, checked, value, onChangeHandler }) => {
	return (
		<label htmlFor={id} className="checkbox">
			<input
				className="checkbox__real"
				id={id}
				type="checkbox"
				checked={checked}
				onChange={() => onChangeHandler(id)}
			/>
			<span className="checkbox__custom"></span>
      <span className="checkbox__text">{value}</span>
		</label>
	);
};

export default Checkbox;

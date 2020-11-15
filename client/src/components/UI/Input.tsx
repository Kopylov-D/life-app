import React from 'react';
import classnames from 'classnames';

type Props = {
	value: string;
	type: string;
	label: string;
	valid: boolean;
	shouldValidate: boolean;
	touched: boolean;

	// optionalLabel: string;
	onChange(event: React.ChangeEvent<HTMLInputElement>, controlName: any): void;
};

function isInvalid({ valid, shouldValidate, touched }: Props) {
	return !valid && shouldValidate && touched;
}

const Input: React.FC<Props> = props => {
	const inputType = props.type || 'text';
	const htmlFor = `${inputType}-${Math.random()}`;

	return (
		<div className={classnames('input', { '--invalid': isInvalid(props) })}>
			{/* <div className={classnames('input')}> */}
			<div>
				<label htmlFor={htmlFor}>
					<span>{props.label}</span>
					{/* <span>{props.optionalLabel}</span> */}
				</label>
			</div>

			<input
				id={htmlFor}
				type={inputType}
				value={props.value}
				onChange={event => props.onChange(event, props.value)}
			/>
		</div>
	);
};

export default Input;

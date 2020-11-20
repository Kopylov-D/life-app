import React from 'react';
import classnames from 'classnames';
import { FormControl } from '../../utils/form';

interface Props extends FormControl {
	onChange(event: React.ChangeEvent<HTMLInputElement>, controlName: any): void;
	onKeyPress?(event: React.KeyboardEvent<HTMLInputElement>): void;
}

function isInvalid({ valid, shouldValidate, touched }: Props) {
	return !valid && shouldValidate && touched;
}

const Input: React.FC<Props> = props => {
	const inputType = props.type || 'text';
	const htmlFor = `${inputType}-${Math.random()}`;

	return (
		<div
			className={classnames('input', `${props.class}`, {
				'--invalid': isInvalid(props),
			})}
		>
			{props.label && (
				<div>
					<label htmlFor={htmlFor}>
						<span>{props.label}</span>
					</label>
				</div>
			)}

			<input
				id={htmlFor}
				type={inputType}
				value={props.value}
				onChange={event => props.onChange(event, props.value)}
				onKeyPress={props.onKeyPress}
				placeholder={props.placeholder}
			/>
		</div>
	);
};

export default Input;

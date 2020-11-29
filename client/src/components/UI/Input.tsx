import React from 'react';
import classnames from 'classnames';
import { FormControl } from '../../services/validations/form';

interface Props extends FormControl {
	onChange(event: React.ChangeEvent<HTMLInputElement>, controlName: any): void;
	onKeyPress?(event: React.KeyboardEvent<HTMLInputElement>): void;
	onClick?(toggle: boolean):void
}

function isInvalid({ valid, shouldValidate, touched }: Props) {
	return !valid && shouldValidate && touched;
}

const Input: React.FC<Props> = props => {
	const inputType = props.type || 'text';
	const htmlFor = `${inputType}-${Math.random()}`;

	const onClickHandler = () => {
		props.onClick && props.onClick(true)
	}

	return (
		<div
			className={classnames(`${props.class}__input`, 'input', {
				'--invalid': isInvalid(props),
			})}
			onClick={onClickHandler}
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

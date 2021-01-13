import React from 'react';
import classnames from 'classnames';

interface Props {
	value: string;
	type: 'text' | 'password' | 'checkbox';
	label?: string;
	valid: boolean;
	touched: boolean;
	shouldValidate?: boolean;
	className?: string;
	placeholder?: string;
	errorMessage?: Array<string>;
	onChange(event: React.ChangeEvent<HTMLInputElement>, controlName: any): void;
	onKeyPress?(event: React.KeyboardEvent<HTMLInputElement>): void;
	onClick?(toggle: boolean): void;
}

function isInvalid({ valid, touched }: Props) {
	return !valid && touched;
}
// function isInvalid({ valid, shouldValidate, touched }: Props) {
// 	return !valid && shouldValidate && touched;
// }

const Input: React.FC<Props> = props => {
	const inputType = props.type || 'text';
	const htmlFor = `${inputType}-${Math.random()}`;

	const onClickHandler = () => {
		props.onClick && props.onClick(true);
	};


	return (
		<div
			className={classnames('input', {
				[`${props.className}__input`]: props.className,
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

			{isInvalid(props) && props.errorMessage && (
				<div>
					{props.errorMessage.map((message: string, index: number) => (
						<div key={index}>{message}</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Input;

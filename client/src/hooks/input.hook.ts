import { useEffect, useState } from 'react';

interface Input {}

export interface Validations {
	minLength?: number;
	// maxLength?: number;
	required?: boolean;
	email?: boolean;
	// notCyrillic?: boolean;
}

interface Config {
	initialValue: string;
	isFormValid?: boolean;
}

function useValidation(value: string, validations: Validations | null) {
	// const [isEmpty, setIsEmpty] = useState(true);
	// const [minLengthError, setMinLengthError] = useState(false);
	const [valid, setValid] = useState<boolean>(true);
	const [errorMessages, setErrorMessages] = useState<Array<string>>([]);

	useEffect(() => {
		if (!validations) {
			setValid(true);
			return;
		}

		setErrorMessages([]);
		setValid(true);
		let isValid = true;

		// if (validations.minLength) {
		// 	inValid = value.length < validations.minLength &&
		// 		setErrorMessages(err => [
		// 			...err,
		// 			`Мин. длина - ${validations.minLength}`,
		// 		]);
		// }

		// if (validations.maxLength) {
		// 	value.length > validations.maxLength &&
		// 		setErrorMessages(err => [
		// 			...err,
		// 			`Макс. длина - ${validations.maxLength}`,
		// 		]);
		// }

		// if (validations.required) {
		// 	value.trim() === '' &&
		// 		setErrorMessages(err => [...err, 'Поле не должно быть пустым']);
		// }

		// if (validations.email) {
		// 	const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		// 	!reg.test(String(value).toLowerCase()) &&
		// 		setErrorMessages(err => [...err, 'Некорректный email']);
		// }

		// if (validations.notCyrillic) {
		// 	const reg = /[а-я]/gi;
		// 	reg.test(String(value).toLowerCase()) &&
		// 		setErrorMessages(err => [...err, 'Кириллица запрещена']);
		// }

		// setValid(!inValid);

		// let isValid = true;

		// if (validation.required) {
		//   isValid = value.trim() !== '' && isValid;
		// }
		for (const validation in validations) {
			switch (validation) {
				case 'minLength':
					if (value.length < validations[validation]!) {
						setValid(false);
					}
					break;
				case 'required':
					if (value.trim() === '') {
						setValid(false);
					}
					break;

				case 'email':
					const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					if (!reg.test(String(value).toLowerCase())) {
						setValid(false);
					}

				// default:
			}
		}
	}, [value]);

	// console.log('hook', valid);

	return {
		valid,
		errorMessages,
		// isEmpty,
		// minLengthError,
	};
}

export const useInput = (config: Config, validations: Validations = {}) => {
	const [value, setValue] = useState(config.initialValue);
	const [touched, setTouched] = useState<boolean>(false);
	const valid = useValidation(value, validations);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTouched(true);
		setValue(e.target.value);
	};

	// const onTouched = (e: React.SyntheticEvent) => {
	// 	setTouched(true);
	// };

	return {
		value,
		onChange,
		// onTouched,
		touched,
		// validations,
		...valid,
	};
};

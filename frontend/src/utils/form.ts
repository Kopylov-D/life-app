interface IValidation {
	required: boolean;
	minLength?: number;
	notCyrillic?: boolean;
}

export function validate(
	value: string,
	validation: IValidation | null = null
): boolean {
	if (!validation) {
		return true;
	}

	let isValid = true;

	if (validation.required) {
		isValid = value.trim() !== '' && isValid;
	}

	if (validation.minLength) {
		isValid = value.length >= validation.minLength && isValid;
	}

	if (validation.notCyrillic) {
		isValid = !value.match(/[а-я]/gi) && isValid;
	}

	return isValid;
}

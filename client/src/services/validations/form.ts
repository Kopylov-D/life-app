export type FormControl = {
	value: string;
	type: 'text' | 'password' | 'checkbox';
	label?: string;
	valid: boolean;
	touched: boolean;
	validation?: {
		required?: boolean;
		notCyrillic?: boolean;
		minLength?: number;
		isNumber?: boolean;
		notNull?: boolean;
	};
	shouldValidate: boolean;
	class?: string;
	placeholder?: string;
};

type Config = {
	type: 'text' | 'password' | 'checkbox';
	label?: string;
	class?: string;
	placeholder?: string;
};

export function createControl(
	config: Config,
	validation: FormControl['validation']
): FormControl {
	return {
		...config,
		validation,
		value: '',
		valid: !!validation,
		touched: false,
		shouldValidate: true,
	};
}

export function validate(
	value: string,
	validation: FormControl['validation']
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

	if (validation.isNumber) {
    isValid = Number.isNaN(+value) === false && isValid;
  }

  if (validation.notNull) {
    isValid = +value !== 0 && isValid;
  }

	return isValid;
}

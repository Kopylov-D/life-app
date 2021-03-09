import { useEffect, useState } from 'react';

export interface Validations {
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  email?: boolean;
  notCyrillic?: boolean;
  isNumber?: boolean;
  isPositiveNumber?: boolean;
  isEmpty?: boolean;
}

interface Config {
  initialValue: string;
  isFormValid?: boolean;
}

function useValidation(value: string, validations: Validations | null) {
  const [valid, setValid] = useState<boolean>(true);
  const [errorMessages, setErrorMessages] = useState<Array<string>>([]);

  useEffect(() => {
    if (!validations) {
      setValid(true);
      return;
    }

    setErrorMessages([]);
    setValid(true);

    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          if (value.length < validations[validation]!) {
            setValid(false);
            setErrorMessages(err => [...err, `Мин. длина - ${validations[validation]}`]);
          }
          break;
        case 'maxLength':
          if (value.length > validations[validation]!) {
            setValid(false);
            setErrorMessages(err => [...err, `Макс. длина - ${validations[validation]}`]);
          }
          break;
        case 'isEmpty':
          if (value.trim() === '') {
            setValid(false);
            setErrorMessages(err => [...err, 'Поле не должно быть пустым']);
          }
          break;
        case 'email':
          let regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          if (!regEmail.test(String(value).toLowerCase())) {
            setValid(false);
            setErrorMessages(err => [...err, 'Некорректный email']);
          }
          break;
        case 'notCyrillic':
          let regCyrillic = /[а-я]/gi;
          if (regCyrillic.test(String(value).toLowerCase())) {
            setValid(false);
            setErrorMessages(err => [...err, 'Кириллица запрещена']);
          }
          break;
        case 'isNumber':
          if (Number.isNaN(+value)) {
            console.log(+value);

            setValid(false);
            setErrorMessages(err => [...err, 'Значение не является числом']);
          }
          break;
        case 'isPositiveNumber':
          if (Number.isNaN(+value) || +value <= 0) {
            setValid(false);
            setErrorMessages(err => [...err, 'Значение должно быть больше 0']);
          }
          break;
      }
    }
  }, [value]);

  return {
    valid,
    errorMessages,
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

  const clearValue = () => {
    setValue('');
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (validations.required) {
      setTouched(true);
    } else {
      setTouched(false);
    }
  };

  return {
    value,
    onChange,
    onBlur,
    clearValue,
    touched,
    ...valid,
  };
};

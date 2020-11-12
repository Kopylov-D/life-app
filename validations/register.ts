import {check, validationResult} from 'express-validator'

export const registerValidations = 	[
  check('email', 'Введите корректный email').normalizeEmail().isEmail(),
  check('password', 'Введите пароль').exists(),
],
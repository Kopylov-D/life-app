import { check } from 'express-validator';

export const registerValidations = [
  check('email', 'Введите корректный email').normalizeEmail().isEmail(),
  check('password', 'Введите пароль').isLength({ min: 6 }),
];

export const loginValidations = [
  check('email', 'Введите корректный email').normalizeEmail().isEmail(),
  check('password', 'Введите пароль').exists(),
];

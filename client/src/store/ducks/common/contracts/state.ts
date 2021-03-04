import { AxiosError } from 'axios';
import { Icons } from '../../../../types';

export interface CommonState {
	alerts: AlertInterface[];
	errors: AxiosError[];
}

export interface AlertPayloadInterface {
	text: string;
	type?: 'error' | 'success' | 'warning' | 'info';
	delay?: number;
	icon?: Icons;
	action?: string;
}

export interface AlertInterface extends AlertPayloadInterface {
	id: number;
}

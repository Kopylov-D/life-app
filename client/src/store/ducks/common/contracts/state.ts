import { Icons } from "../../../../types";

export interface CommonState {
  alerts: AlertInterface[]
}

export interface AlertPayloadInterface {
	text: string;
	type?: 'error' | 'success' | 'warning' | 'info'
	delay?: number;
	icon?: Icons;
	action?: string;
}

export interface AlertInterface extends AlertPayloadInterface{
	id: number;
}


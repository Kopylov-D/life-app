import { AxiosError } from "axios";
import { Action } from "redux";
import { AlertInterface } from "./state";

export enum CommonActionTypes {
	SHOW_ALERT = 'SHOW_ALERT',
	HIDE_ALERT = 'HIDE_ALERT',
	SET_ERROR = 'SET_ERROR'
}

export type CommonActions = ShowAlertActionInterface | HideAlertActionInterface | SetErrorActionInterface;


export interface ShowAlertActionInterface extends Action<CommonActionTypes> {
	type: CommonActionTypes.SHOW_ALERT;
	payload: AlertInterface;
}

export interface HideAlertActionInterface extends Action<CommonActionTypes> {
	type: CommonActionTypes.HIDE_ALERT;
	payload: number;
}

export interface SetErrorActionInterface extends Action<CommonActionTypes> {
	type: CommonActionTypes.SET_ERROR;
	payload: AxiosError;
}

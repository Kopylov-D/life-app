import { AxiosError } from "axios";
import { ShowAlertActionInterface, CommonActionTypes, HideAlertActionInterface, SetErrorActionInterface } from "./contracts/actionTypes";
import { AlertInterface } from "./contracts/state";

export const setAlert = (payload: AlertInterface): ShowAlertActionInterface => ({
	type: CommonActionTypes.SHOW_ALERT,
	payload,
});

export const hideAlert = (payload: number): HideAlertActionInterface => ({
	type: CommonActionTypes.HIDE_ALERT,
	payload,
});

export const setError = (payload: AxiosError): SetErrorActionInterface => ({
	type: CommonActionTypes.SET_ERROR,
	payload,
});
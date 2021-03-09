import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../rootReducer';
import { hideAlert, setAlert } from './actionCreators';
import { CommonActions } from './contracts/actionTypes';
import { AlertPayloadInterface } from './contracts/state';

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, CommonActions>;

export const showAlert = (alert: AlertPayloadInterface): ThunkType => {
  return async dispatch => {
    const { text, delay, type = 'info', action } = alert;
    const id = new Date().getTime();
    dispatch(setAlert({ text, type, delay, action, id }));

    alert.delay &&
      setTimeout(() => {
        dispatch(hideAlert(id));
      }, alert.delay);
  };
};

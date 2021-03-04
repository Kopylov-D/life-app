import { RootState } from '../../rootReducer';
import { AlertInterface } from './contracts/state';

export const selectAlerts = (state: RootState): AlertInterface[] => state.common.alerts;

import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as ingEgreso from './ingreso-egreso/ingreso-egreso.reducer';


export interface AppState {
    ui: ui.State,
    auth: auth.State
    //ingresoEgreso: ingEgreso.State
}



export const appReducers: ActionReducerMap<AppState> = {
    ui: ui.uiReducer,
    auth: auth.authReducer,
    //ingresoEgreso: ingEgreso.ingresoEgreso
}
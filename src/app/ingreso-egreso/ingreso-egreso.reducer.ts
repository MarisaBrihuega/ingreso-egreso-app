import { IngresoEgreso } from './../models/ingreso-egreso.model';
import { createReducer, on } from '@ngrx/store';
import { setItems, unSetItems } from './ingreso-egreso.actions';
import { AppState } from '../app.reducer';

export interface State {
    items: IngresoEgreso[];
}

export interface AppStateWithIngreso extends AppState {
    /* Esta interfaz se utiliza para que, cuando use el store, este reconozca la parte de 
    ingresoEgreso que cargamos de manera perezosa (la cual no se encuentra ya en la interfaz general 
    AppState que es el tipo de mi store)*/
    ingresoEgreso: State // hace referencia a la interfaz creada en la línea 6

}

export const initialState: State = {
    items: [],
}

const _ingresoEgreso = createReducer(initialState,

    on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
    on(unSetItems, state => ({ ...state, items: [] })),

);

export function ingresoEgreso(state: any, action: any) {
    return _ingresoEgreso(state, action);
}
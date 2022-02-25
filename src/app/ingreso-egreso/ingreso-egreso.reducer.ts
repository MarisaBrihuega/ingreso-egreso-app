import { IngresoEgreso } from './../models/ingreso-egreso.model';
import { createReducer, on } from '@ngrx/store';
import { setItems, unSetItems } from './ingreso-egreso.actions';

export interface State {
    items: IngresoEgreso[];
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
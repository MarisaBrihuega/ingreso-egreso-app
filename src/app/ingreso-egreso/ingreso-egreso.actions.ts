import { IngresoEgreso } from './../models/ingreso-egreso.model';
import { createAction, props } from '@ngrx/store';

export const setItems = createAction(
    '[IngresoEgreso] setItems',
    props<{ items: IngresoEgreso[] }>()
);
export const unSetItems = createAction('[IngresoEgreso] UnSetItems');
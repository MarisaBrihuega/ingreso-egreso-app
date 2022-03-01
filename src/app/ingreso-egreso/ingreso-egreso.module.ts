import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { OrdenIngresoPipe } from '../pipes/orden-ingreso.pipe';
import { ReactiveFormsModule } from '@angular/forms';

// N2-CHARTS
import { NgChartsModule } from 'ng2-charts';

// MÓDULOS
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { StoreModule } from '@ngrx/store';

import { ingresoEgreso } from './ingreso-egreso.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoPipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('ingresoEgreso', ingresoEgreso), /* permite la carga perezosa de una parte del store, de 
                                                               manera que si el usuario no se loggea, en este 
                                                               caso no podrá ver la parte de ingresoEgreso del store*/
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule, /*en este módulo de ingreso-egreso usamos los componentes del sharedModule 
    (ya que estos se usan en el dashboard y el dashboardComponent lo estamos declarando aquí), 
    por lo que es necesario importar el sharedModule*/
    DashboardRoutesModule
  ]
})
export class IngresoEgresoModule { }

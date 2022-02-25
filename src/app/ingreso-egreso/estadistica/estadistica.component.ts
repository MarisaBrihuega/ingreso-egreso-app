import { IngresoEgreso } from './../../models/ingreso-egreso.model';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ChartType, ChartData } from 'chart.js';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {

  ingresos: number = 0;
  egresos: number = 0;

  totalIngresos: number = 0;
  totalEgresos: number = 0;

  public chartLabel: string[] = ['Ingresos', 'Egresos'];

  public chartData: ChartData<'doughnut'> = {
    labels: this.chartLabel,
    datasets: [ /*{ data: [0, 0] }*/]
  };

  public chartType: ChartType = 'doughnut';

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('ingresoEgreso').subscribe(({ items }) => this.generarEstadistica(items));
  }

  generarEstadistica(items: IngresoEgreso[]) {
    /* 
     * Reseteamos estos valores ya que, cada vez que se modifica la 
     * información del store (por ejemplo si modificamos el nombre del usuario), 
     * se ejecuta este método y los valores se duplican
     */
    this.totalIngresos = 0;
    this.totalEgresos = 0;
    this.ingresos = 0;
    this.egresos = 0;

    for (const item of items) {
      if (item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos++;
      }
    }

    this.chartData.datasets = [{ data: [this.totalIngresos, this.totalEgresos] }];
  }

}

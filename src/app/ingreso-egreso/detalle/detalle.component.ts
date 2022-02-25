import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresosList: IngresoEgreso[] = [];
  ingresoSubscription: Subscription | undefined;

  constructor(private store: Store<AppState>,
    private ingEgrService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.ingresoSubscription = this.store.select('ingresoEgreso')
      .subscribe(({ items }) => this.ingresosEgresosList = items);
  }

  borrar(uid: string | undefined) {
    this.ingEgrService.borrarIngresoEgreso(uid!)
      .then(() => {
        Swal.fire('Borrado', 'Item borrado', 'success');
      })
      .catch(error => {
        Swal.fire('Error', error.message, 'error');
      })
  }

  ngOnDestroy(): void {
    this.ingresoSubscription?.unsubscribe();
  }

}

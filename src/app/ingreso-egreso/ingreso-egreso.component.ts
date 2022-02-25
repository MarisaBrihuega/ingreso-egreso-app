import { stopLoading } from './../shared/ui.actions';
import { AppState } from 'src/app/app.reducer';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { isLoading } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  tipo: string = 'ingreso'
  loading: boolean = false;
  uiSubscription: Subscription | undefined;

  constructor(private fb: FormBuilder,
    private ingEgService: IngresoEgresoService,
    private store: Store<AppState>) {

    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);
  }

  guardar() {
    if (this.ingresoForm.invalid) { return; }
    this.store.dispatch(isLoading());

    const { descripcion, monto } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);

    this.ingEgService.crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.ingresoForm.reset();
        this.store.dispatch(stopLoading());
        Swal.fire('Registro creado con éxito', descripcion, 'success');
      })
      .catch(error => {
        this.store.dispatch(stopLoading());
        Swal.fire('Error', error, 'error');
      })
  }

  ngOnDestroy(): void {
    this.uiSubscription?.unsubscribe();
  }

}

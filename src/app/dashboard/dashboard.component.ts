import { setItems } from './../ingreso-egreso/ingreso-egreso.actions';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { filter, Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubscription: Subscription | undefined;
  ingresosSubscription: Subscription | undefined;

  constructor(private store: Store<AppState>,
    private ingEgrService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('auth')
      .pipe(
        /*
         * Permite establecer una condicion. 
         * Si regresa true (auth.user tiene valor), deja pasar la información a través del observable.
         * Si regresa false (auth.user no tiene valor), lo bloquea y no llegaremos a la línea 31
         */
        filter(auth => auth.user != null)
      )
      .subscribe(auth => {
        this.ingresosSubscription = this.ingEgrService.initIngresosEgresosListener(auth.user!.uid)
          .subscribe(ingresosEgresos => {
            this.store.dispatch(setItems({ items: ingresosEgresos }));
          });
      });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.ingresosSubscription?.unsubscribe();
  }

}

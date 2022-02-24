import { AppState } from './../../app.reducer';
import { Store } from '@ngrx/store';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  formRegistro: FormGroup;
  loading: boolean = false;
  uiSubscription: Subscription | undefined;

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>) {

    this.formRegistro = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required, Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
    /* 
     * Así va a estar siempre pendiente a los cambios, y cada vez que se llame a las acciones isLoading() 
     * o stopLoading() esto se ejecuta y el valor de la variable loading se actualiza
     */
    this.uiSubscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);
  }

  crearUsuario() {
    if (this.formRegistro.invalid) { return; }
    this.store.dispatch(isLoading());

    // Swal.fire({
    //   title: 'Espero por favor!',
    //   didOpen: () => {
    //     Swal.showLoading()

    //   }
    // });

    // DESESTRUCTURACIÓN
    const { nombre, correo, password } = this.formRegistro.value;

    this.auth.crearUsuario(nombre, correo, password)
      .then(credenciales => {
        console.log(credenciales);

        this.store.dispatch(stopLoading());

        // Swal.close();
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.store.dispatch(stopLoading());

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        })
      });
  }

  ngOnDestroy(): void {
    this.uiSubscription?.unsubscribe();
  }

}

import { isLoading, stopLoading } from './../../shared/ui.actions';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loading: boolean = false;
  uiSubscription: Subscription | undefined;

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    /* 
     * Así va a estar siempre pendiente a los cambios, y cada vez que se llame a las acciones isLoading() 
     * o stopLoading() esto se ejecuta y el valor de la variable loading se actualiza
     */
    this.uiSubscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);
  }

  login() {
    if (this.loginForm.invalid) { return; }

    this.store.dispatch(isLoading());

    // Swal.fire({
    //   title: 'Espero por favor!',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // });

    const { email, password } = this.loginForm.value;

    this.auth.loginUsuario(email, password)
      .then((credenciales) => {
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

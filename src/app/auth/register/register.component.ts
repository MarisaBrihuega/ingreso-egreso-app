import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  formRegistro: FormGroup;

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router) {

    this.formRegistro = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required, Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {

  }

  crearUsuario() {
    if (this.formRegistro.invalid) { return; }

    Swal.fire({
      title: 'Espero por favor!',
      didOpen: () => {
        Swal.showLoading()

      }
    });

    // DESESTRUCTURACIÓN
    const { nombre, correo, password } = this.formRegistro.value;

    this.auth.crearUsuario(nombre, correo, password)
      .then(credenciales => {
        console.log(credenciales);
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch(error =>
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        })
      );
  }

}

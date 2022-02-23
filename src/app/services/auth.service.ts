import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public authFire: AngularFireAuth,
    private firestore: AngularFirestore) { }

  // Esta a la escucha de cambios en la autenticación, y de inicios y cierres de sesión
  inithAuthListener() {
    this.authFire.authState.subscribe(firebaseUser => {
      console.log(firebaseUser?.uid);
      console.log(firebaseUser?.email);
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    // retorna una promesa
    return this.authFire.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new Usuario(user!.uid, nombre, email);
        // como se debe retornar una promesa, retornamos la siguiente:
        return this.firestore.doc(`${user?.uid}/usuario`).set({ ...newUser }); // firebase no acepta instancias de clase, solo un objeto genérico (Object) por lo que enviamos las propiedas por separado, una por una
      });
  }

  loginUsuario(email: string, password: string) {
    return this.authFire.signInWithEmailAndPassword(email, password);

  }

  logout() {
    return this.authFire.signOut();
  }


  isAuth() {
    return this.authFire.authState.pipe(
      map(firebaseUser => firebaseUser != null)
    );
  }
}

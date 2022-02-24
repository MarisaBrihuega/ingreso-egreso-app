import { setUser, unSetUser } from './../auth/auth.actions';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Subscription } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription | undefined;

  constructor(public authFire: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>) { }

  // Esta a la escucha de cambios en la autenticación, y de inicios y cierres de sesión
  inithAuthListener() {
    // Esta primera subscripción si debe conservarse, ya que debe estar pendiente de los cambios de usuario durante toda la ejecución de la app
    this.authFire.authState.subscribe(firebaseUser => {
      // console.log(firebaseUser?.uid);
      // console.log(firebaseUser?.email);
      if (firebaseUser) {
        /* 
         * Necesito obtener el nombre del usuario, y este no se encuentra dentro del objeto firebaseAuth, 
         * por lo que vamos a obtenerlo a través de la BD (CloudFirestore), accediento al nodo que hace 
         * referencia a dicho usuario.
         * Este valueChanges() estará pendiente de los cambios del usuario.
         */
        this.userSubscription = this.firestore.doc(`${firebaseUser.uid}/usuario`).valueChanges().subscribe((firestoreUser: any) => {
          // const userLogged = new Usuario(user.uid, user.nombre, user.email);
          const user = Usuario.fromFirestore(firestoreUser);
          this.store.dispatch(setUser({ user: user })); // Podría ser: this.store.dispatch(setUser({ user }));
        });
      } else {
        /*
         * Cada vez que se cierra sesión y cambia el valor del usuario, esto se dispara (cerrando la subscripción 
         * del antiguo usuario) y se crea otra nueva subscripcion para el nuevo usuario que inice sesión.
         * Es decir: se cierra sesión > este servicio se ejecuta > entra en el else (porque firebaseUser ya no tiene valor) > 
         * se cierra la subscripcion. Cuando se inicie de nuevo sesión: este servicio se ejecuta > entra en el if (porque 
         * firebaseUser ya sí tiene valor) > se abre una nueva subscripción.
         */
        this.userSubscription?.unsubscribe();
        this.store.dispatch(unSetUser());
      }
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

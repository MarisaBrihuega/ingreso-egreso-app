import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore: AngularFirestore,
    private authService: AuthService) { }

  initIngresosEgresosListener(uid: string) {
    return this.firestore.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges() // en lugar de valueChanges(), para poder obtener el id de cada item
      .pipe(
        map(snapshot => {
          return snapshot.map(doc => {
            return {
              ...doc.payload.doc.data() as any,
              uid: doc.payload.doc.id,
            }
          });
        })
      );
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    return this.firestore.doc(`${this.authService.user?.uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso, uid: null }); // no debo enviar al doc una instancia de clase (objeto), solo las propiedades del mismo
    // .then(docRef => console.log('exito!', docRef))
    // .catch(error => console.warn('ERROR', error));
  }

  borrarIngresoEgreso(uidItem: string) {
    return this.firestore.doc(`${this.authService.user?.uid}/ingresos-egresos/items/${uidItem}`)
      .delete();
  }
}

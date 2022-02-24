export class Usuario {

    constructor(public uid: string, public nombre: string, public email: string) { }

    /*
     * Para hacer una conversión: convertimos el objeto firebaseUser obtenido de CloudFirestore 
     *(de la BD) en un objeto de tipo Usuario
     */
    static fromFirestore({ uid, nombre, email }: any) {
        return new Usuario(uid, nombre, email);
    }
}
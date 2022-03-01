import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private auth: AuthService,
    private router: Router) { }


  canLoad(): Observable<boolean> {
    return this.auth.isAuth()
      .pipe( // tap() es un operador rxjs que se utiliza para disparar un valor secundario, tras haber devuelvo el observable el primer valor
        tap(estado => {
          if (!estado) {
            this.router.navigate(['/login']);
          }
        }),
        take(1) /* De esta manera cancelo la subscripción inmediatamente cuando ya se ha resuelto la primera vez. 
        Esto lo hacemos así porque cada vez que el usuario quiera acceder al módulo es necesario verificar si está loggeado 
        con este guard, lanzando SIEMPRE una nueva subscripción*/
      );
  }

  canActivate(): Observable<boolean> {
    return this.auth.isAuth()
      .pipe( // tap() es un operador rxjs que se utiliza para disparar un valor secundario, tras haber devuelvo el observable el primer valor
        tap(estado => {
          if (!estado) {
            this.router.navigate(['/login']);
          }
        })
      );
  }

  // route (página a la que quiere ir el usuario), state (página en la que se encuentra)
  /*canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }*/
}

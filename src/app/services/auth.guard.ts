import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
    private router: Router) { }

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

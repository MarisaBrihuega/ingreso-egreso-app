import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ingresoEgresoApp';

  constructor(private auth: AuthService) {
    /*
     * Para que esté atento a los cambios en la autenticación, ya que el app.component 
     * es lo primero que se ejecuta siempre. Si llamasemos a este servicio 
     * desde login por ejemplo, a lo mejor no se ejecuta porque no siempre se pasa por 
     * la pagina de login
     */
    this.auth.inithAuthListener();
  }
}

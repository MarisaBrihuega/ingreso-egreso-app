import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';


// NGRX
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// ANGULAR FIRE
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // para trabajar con la autenticación de firebase
import { AngularFireModule } from '@angular/fire/compat'; // para la configuración de firebase
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// MÓDULOS
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    AuthModule,

    AppRoutingModule, // si no lo importamos no encuentra las rutas
    StoreModule.forRoot(appReducers), // forRoot() para cargar el store 'raiz' o principal de la app
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { AuthGuard } from './services/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashboardRoutes } from './dashboard/dashboard.routes';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    canLoad: [AuthGuard],
    // se carga el archivo de ingreso-egreso.module, y cuando esto sucede, se obtiene el módulo IngresoEgresoModule
    loadChildren: () => import('./ingreso-egreso/ingreso-egreso.module').then(modulo => modulo.IngresoEgresoModule)
    //IngresoEgresoModule,

  },
  { path: '**', redirectTo: '' } // Cualquier otro path me llevará al dashboard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

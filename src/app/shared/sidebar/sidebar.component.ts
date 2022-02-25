import { filter, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  userName: string = '';
  userSubscription: Subscription | undefined;

  constructor(private auth: AuthService,
    private router: Router,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('auth')
      .pipe(
        filter(({ user }) => user != null)
      )
      .subscribe(({ user }) => {
        this.userName = user!.nombre;
      });
  }

  logout() {
    this.auth.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}

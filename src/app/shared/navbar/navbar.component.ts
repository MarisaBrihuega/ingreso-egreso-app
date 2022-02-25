import { AppState } from 'src/app/app.reducer';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  userName: string = '';
  userSubscription: Subscription | undefined;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('auth')
      .pipe(filter(({ user }) => user != null))
      .subscribe(({ user }) => this.userName = user!.nombre);
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

}

import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { NgIf } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './app.component.html'
})
export class AppComponent {
  private router = inject(Router);

  currentUrl = signal(this.router.url);

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => this.currentUrl.set(e.urlAfterRedirects));
  }

  showNav() {
    return !this.currentUrl().startsWith('/login');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
    this.router.navigateByUrl('/login');
  }
}

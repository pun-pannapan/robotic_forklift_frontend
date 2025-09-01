import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = ''; password = ''; loading = false; error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.loading = true; this.error = '';
    this.auth.login({ username: this.username, password: this.password })
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: () => { this.error = 'Invalid credentials'; this.loading = false; }
      });
  }
}
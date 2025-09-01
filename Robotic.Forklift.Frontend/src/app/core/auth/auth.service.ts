import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse } from '../models/api-models';
import { tap } from 'rxjs/operators';
import { TokenStorage } from './token-storage.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private store: TokenStorage
  ) {}

  login(req: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.base}/api/Auth/login`, req).pipe(
      tap(res => {
        if (res?.token) {
          const expiresAt = (res as any).expiresAt;
          this.store.setAuth(res.token, expiresAt);
        }
      })
    );
  }

  logout() {
    this.store.clear();
  }

  isAuthenticated() {
    return this.store.isAuth();
  }
}
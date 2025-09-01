import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class TokenStorage {
  private TOKEN_KEY = 'token';
  private EXPIRES_KEY = 'expiresAt';
  private platformId = inject(PLATFORM_ID);

  private get storage(): Storage | null {
    return isPlatformBrowser(this.platformId) ? window.localStorage : null;
  }

  getToken(): string | null {
    const s = this.storage;
    if (!s) return null;
    const raw = s.getItem(this.TOKEN_KEY);
    if (!raw || raw === 'null' || raw === 'undefined' || raw.trim() === '') return null;
    return raw;
  }

  isAuth(): boolean {
    const s = this.storage;
    if (!s) return false;

    const token = this.getToken();
    if (!token) return false;

    const rawExp = s.getItem(this.EXPIRES_KEY);
    if (!rawExp) return true;

    const exp = Number(rawExp);
    if (Number.isNaN(exp)) return false;

    return Date.now() < exp;
  }

  setAuth(token: string, expiresAt?: number | string) {
    const s = this.storage;
    if (!s) return;
    s.setItem(this.TOKEN_KEY, token);

    if (typeof expiresAt !== 'undefined' && expiresAt !== null) {
      const expNum = typeof expiresAt === 'string' ? Number(expiresAt) : expiresAt;
      if (!Number.isNaN(expNum)) {
        s.setItem(this.EXPIRES_KEY, String(expNum));
      }
    }
  }

  clear() {
    const s = this.storage;
    if (!s) return;
    s.removeItem(this.TOKEN_KEY);
    s.removeItem(this.EXPIRES_KEY);
  }

  set(token: string) {
    this.setAuth(token);
  }
}
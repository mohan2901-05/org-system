import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly TOKEN_KEY = 'gsi_id_token';

  constructor(private router: Router) {}

  /** Called by Google GIS button callback with the id_token */
  setToken(idToken: string) {
    localStorage.setItem(this.TOKEN_KEY, idToken);
  }

  /** Returns the stored Google id_token (JWT) */
  get idToken(): string {
    return localStorage.getItem(this.TOKEN_KEY) || '';
  }

  /** True if a non-expired id_token exists */
  get isLoggedIn(): boolean {
    const token = this.idToken;
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  /** User info decoded from the JWT */
  get userProfile(): any {
    const token = this.idToken;
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }

  get userName(): string {
    return this.userProfile?.name ?? '';
  }

  get userEmail(): string {
    return this.userProfile?.email ?? '';
  }

  get userPicture(): string {
    return this.userProfile?.picture ?? '';
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }
}

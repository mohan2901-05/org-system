import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

declare const google: any;

const GOOGLE_CLIENT_ID =
  '38825523449-jdfsb8jbn3h6chjpmnbdk90h97nq7nuv.apps.googleusercontent.com';
const API = 'http://localhost:8080';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  // ── Tab state ──────────────────────────────────────────────
  activeTab: 'signin' | 'register' = 'signin';

  // ── Sign-in form ───────────────────────────────────────────
  siEmail    = '';
  siPassword = '';
  siLoading  = false;
  siError    = '';
  siShowPwd  = false;

  // ── Register form ──────────────────────────────────────────
  regName     = '';
  regEmail    = '';
  regPassword = '';
  regConfirm  = '';
  regLoading  = false;
  regError    = '';
  regSuccess  = '';
  regShowPwd  = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private ngZone: NgZone,
    private http: HttpClient
  ) {}

  ngOnInit() {
    if (this.auth.isLoggedIn) this.router.navigate(['/org-select']);
  }

  ngAfterViewInit() {
    this.waitForGsi().then(() => this.initGsi());
  }

  // ── Google GIS ─────────────────────────────────────────────
  private waitForGsi(): Promise<void> {
    return new Promise(resolve => {
      if (typeof google !== 'undefined' && google.accounts) { resolve(); return; }
      const iv = setInterval(() => {
        if (typeof google !== 'undefined' && google.accounts) { clearInterval(iv); resolve(); }
      }, 100);
    });
  }

  private initGsi() {
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (r: any) => this.handleGoogleCredential(r),
      auto_select: false,
      cancel_on_tap_outside: true,
    });
    google.accounts.id.renderButton(
      document.getElementById('google-btn-container'),
      { theme: 'outline', size: 'large', shape: 'rectangular', width: 320, text: 'continue_with' }
    );
  }

  private handleGoogleCredential(response: any) {
    this.auth.setToken(response.credential);
    this.http.post(`${API}/user/sync`, {}).subscribe({ error: () => {} });
    this.ngZone.run(() => this.router.navigate(['/org-select']));
  }

  // ── Sign In (email + password) ─────────────────────────────
  signIn() {
    this.siError = '';
    if (!this.siEmail || !this.siPassword) {
      this.siError = 'Please fill in all fields.'; return;
    }
    this.siLoading = true;
    this.http.post<any>(`${API}/auth/login`, {
      email: this.siEmail, password: this.siPassword
    }).subscribe({
      next: (res) => {
        this.auth.setToken(res.token);
        this.router.navigate(['/org-select']);
      },
      error: (err) => {
        this.siError   = err.error?.error || 'Login failed. Please try again.';
        this.siLoading = false;
      }
    });
  }

  // ── Register (email + password) ────────────────────────────
  register() {
    this.regError = ''; this.regSuccess = '';
    if (!this.regName || !this.regEmail || !this.regPassword) {
      this.regError = 'Please fill in all fields.'; return;
    }
    if (this.regPassword !== this.regConfirm) {
      this.regError = 'Passwords do not match.'; return;
    }
    if (this.regPassword.length < 6) {
      this.regError = 'Password must be at least 6 characters.'; return;
    }
    this.regLoading = true;
    this.http.post<any>(`${API}/auth/register`, {
      name: this.regName, email: this.regEmail, password: this.regPassword
    }).subscribe({
      next: (res) => {
        this.auth.setToken(res.token);
        this.router.navigate(['/org-select']);
      },
      error: (err) => {
        this.regError   = err.error?.error || 'Registration failed. Please try again.';
        this.regLoading = false;
      }
    });
  }

  switchTab(tab: 'signin' | 'register') {
    this.activeTab = tab;
    this.siError = ''; this.regError = ''; this.regSuccess = '';
  }
}
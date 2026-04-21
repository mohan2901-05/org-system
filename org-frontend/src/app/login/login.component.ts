import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    if (this.username && this.password) {
      localStorage.setItem("user", this.username);
      this.router.navigate(['/org-select']);
    }
  }

  guestLogin() {
    localStorage.setItem("user", "guest");
    this.router.navigate(['/org-select']);
  }
}
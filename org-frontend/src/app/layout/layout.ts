import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class LayoutComponent implements OnInit {
  sidebarOpen = false;
  profileOpen = false;

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {}

  get orgName(): string {
    return localStorage.getItem('orgName') || '';
  }

  toggleSidebar() { this.sidebarOpen = !this.sidebarOpen; }
  closeSidebar()  { this.sidebarOpen = false; }

  toggleProfile() { this.profileOpen = !this.profileOpen; }

  // Close profile dropdown & sidebar when clicking outside
  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!target.closest('.profile-menu') && !target.closest('.avatar-btn')) {
      this.profileOpen = false;
    }
    if (!target.closest('.sidebar') && !target.closest('.hamburger-btn')) {
      this.sidebarOpen = false;
    }
  }

  // Close sidebar on Escape key
  @HostListener('document:keydown.escape')
  onEscape() { this.sidebarOpen = false; this.profileOpen = false; }

  navigate(path: string) {
    this.router.navigate([path]);
    this.sidebarOpen = false;
  }

  logout() { this.auth.logout(); }
}
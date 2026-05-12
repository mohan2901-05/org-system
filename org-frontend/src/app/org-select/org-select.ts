import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-org-select',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './org-select.html',
  styleUrls: ['./org-select.css']
})
export class OrgSelectComponent implements OnInit {

  orgList: any[] = [];
  selectedOrgId: string = '';
  selectedOrgName: string = '';
  isLoading: boolean = true;
  error: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadOrgs();
  }

  loadOrgs() {
    this.isLoading = true;
    this.error = '';

    this.http.get<any[]>('http://localhost:8080/org').subscribe({
      next: (data) => {
        console.log('ORG DATA:', data);
        this.orgList = data || [];
        this.isLoading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error loading orgs:', err);
        this.error = 'Failed to load organizations. Is the backend running?';
        this.isLoading = false;
        this.cd.detectChanges();
      }
    });
  }

  onOrgChange(orgId: string) {
    const org = this.orgList.find(o => (o.pkOrgId || o.pk_org_id) === orgId);
    this.selectedOrgName = org ? (org.orgName || org.org_name) : '';
    this.error = '';
  }

  proceed() {
    if (!this.selectedOrgId) {
      this.error = 'Please select an organization to continue.';
      return;
    }
    localStorage.setItem('orgId', this.selectedOrgId);
    localStorage.setItem('orgName', this.selectedOrgName);
    console.log('Proceeding with org:', this.selectedOrgId, this.selectedOrgName);
    this.router.navigate(['/class-view']);
  }
}
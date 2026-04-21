import { Component, OnInit } from '@angular/core';
import { OrgService } from '../org.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';   // ✅ IMPORTANT
import { CommonModule } from '@angular/common'; // ✅ for ngFor

@Component({
  selector: 'app-org-select',
  standalone: true,  // ✅ REQUIRED
  imports: [FormsModule, CommonModule], // ✅ REQUIRED
  templateUrl: './org-select.html',
  styleUrls: ['./org-select.css']
})
export class OrgSelectComponent implements OnInit {

  orgList: any[] = [];
  selectedOrg: string = '';

  constructor(private service: OrgService, private router: Router) { }

  ngOnInit() {
    this.orgList = [];   // ✅ reset first
    this.loadOrgs();
  }

  loadOrgs() {
    this.service.getOrgs().subscribe((res: any) => {
      console.log("ORG RESPONSE:", res);
      this.orgList = res || [];   // ✅ ensure array
    }, (err) => {
      console.error("Error loading orgs:", err);
    });
  }

  proceed() {
    console.log("Selected Org:", this.selectedOrg); // 🔥

    if (!this.selectedOrg) {
      alert("Please select organization");
      return;
    }

    localStorage.setItem("orgId", this.selectedOrg);

    this.router.navigate(['/class-view']);
  }
}
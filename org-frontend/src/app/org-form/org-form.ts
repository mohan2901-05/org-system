import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrgService } from '../org.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-org-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './org-form.html',
  styleUrls: ['./org-form.css']
})
export class OrgForm implements OnInit {

  orgData = {
    orgId: '',
    classId: '',
    className: ''
  };

  isEdit = false;
  successMessage = '';

  constructor(
    private orgService: OrgService,
    private router: Router
  ){}

  ngOnInit(): void {

    const data = localStorage.getItem("editData");

    if(data){
      const obj = JSON.parse(data);

      this.orgData = {
        orgId: obj.fkOrgId,
        classId: obj.pkClassId,
        className: obj.className
      };

      this.isEdit = true;

      // ✅ IMPORTANT FIX — clear immediately
      localStorage.removeItem("editData");
    }
  }

  submitForm(){

    const payload = {
      pkClassId: this.orgData.classId,
      fkOrgId: this.orgData.orgId,
      className: this.orgData.className,
      status: "A"
    };

    if(this.isEdit){

      this.orgService.updateClass(payload).subscribe(() => {

        this.successMessage = "✅ Updated Successfully";

        this.resetForm();

        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/view']);
        }, 1500);

      });

    } else {

      this.orgService.saveData(payload).subscribe(() => {

        this.successMessage = "✅ Saved Successfully";

        this.resetForm();

        setTimeout(() => {
          this.successMessage = '';
        }, 1500);

      });

    }
  }

  resetForm(){
    this.orgData = {
      orgId: '',
      classId: '',
      className: ''
    };
    this.isEdit = false;
  }
}
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './class-view.html',
  styleUrls: ['./class-view.css']
})
export class ClassView implements OnInit {

  classes: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private cd: ChangeDetectorRef   // 🔥 IMPORTANT
  ) { }

  ngOnInit(): void {

    const orgId = localStorage.getItem("orgId");

    console.log("ORG ID:", orgId);

    if (orgId) {
      this.http.get<any[]>("http://localhost:8080/class?orgId=" + orgId)
        .subscribe(data => {

          console.log("API DATA:", data);

          this.classes = data;

          // 🔥 FORCE UI UPDATE
          this.cd.detectChanges();

          console.log("UPDATED CLASSES:", this.classes);
        });
    }
  }

  selectClass(c: any) {
    console.log("CLICKED CLASS:", c);

    // 🔥 FIX (handle all possible field names)
    const classId = c.pkClassId || c.pk_class_id;

    console.log("STORING classId:", classId);

    localStorage.setItem("classId", classId);

    this.router.navigate(['/subject-view']);
  }

  goBack() {
    this.router.navigate(['/org-select']);
  }
}
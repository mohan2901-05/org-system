// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-subject-view',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './subject-view.html',
//   styleUrls: ['./subject-view.css']
// })
// export class SubjectView implements OnInit {

//   subjects: any[] = [];   // ✅ ONLY THIS VARIABLE

//   constructor(private http: HttpClient, private router: Router) {}

//   ngOnInit(): void {
//     const classId = localStorage.getItem("classId");

//     console.log("CLASS ID IN SUBJECT:", classId);

//     if (classId) {
//       this.http.get<any[]>("http://localhost:8080/subject?classId=" + classId)
//         .subscribe(data => {
//           console.log("SUBJECT DATA:", data);

//           // 🔥 IMPORTANT — ASSIGN TO SAME VARIABLE
//           this.subjects = [...data];

//           console.log("FINAL SUBJECTS:", this.subjects);
//         });
//     }
//   }

//   selectSubject(s: any) {
//     localStorage.setItem("subjectId", s.pkSubjectId);
//     this.router.navigate(['/chapter-view']);
//   }

//   goBack() {
//     this.router.navigate(['/class-view']);
//   }
// }

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subject-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subject-view.html',
  styleUrls: ['./subject-view.css']
})
export class SubjectView implements OnInit {

  subjects: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private cd: ChangeDetectorRef   // 🔥 IMPORTANT
  ) {}

  ngOnInit(): void {

    const classId = localStorage.getItem("classId");

    if (classId) {
      this.http.get<any[]>("http://localhost:8080/subject?classId=" + classId)
        .subscribe(data => {
          this.subjects = data;

          // 🔥 FORCE UI UPDATE
          this.cd.detectChanges();
        });
    }
  }

  selectSubject(s: any) {
    localStorage.setItem("subjectId", s.pkSubjectId);
    this.router.navigate(['/chapter-view']);
  }

  goBack() {
    this.router.navigate(['/class-view']);
  }
}
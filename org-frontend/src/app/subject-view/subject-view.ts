import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const SUBJECT_ICONS = ['🔬','🧮','🌍','⚗️','🎨','🏛️','🧬','📐','🎭','🌱'];

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
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const classId = localStorage.getItem('classId');
    if (classId) {
      this.http.get<any[]>('http://localhost:8080/subject?classId=' + classId)
        .subscribe({
          next: (data) => { this.subjects = data || []; this.cd.detectChanges(); },
          error: (err) => console.error('Error loading subjects:', err)
        });
    }
  }

  getIcon(i: number): string { return SUBJECT_ICONS[i % SUBJECT_ICONS.length]; }

  selectSubject(s: any) {
    localStorage.setItem('subjectId', s.pkSubjectId || s.pk_subject_id);
    localStorage.setItem('subjectName', s.subjectName || s.subject_name || '');
    this.router.navigate(['/chapter-view']);
  }

  goBack() { this.router.navigate(['/class-view']); }
}
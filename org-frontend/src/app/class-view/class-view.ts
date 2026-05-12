import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const CLASS_ICONS = ['📗','📘','📙','📕','📓','📔','📒','📃','📄','📑'];

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
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const orgId = localStorage.getItem('orgId');
    console.log('ORG ID:', orgId);
    if (orgId) {
      this.http.get<any[]>('http://localhost:8080/class?orgId=' + orgId)
        .subscribe({
          next: (data) => {
            this.classes = data || [];
            this.cd.detectChanges();
          },
          error: (err) => console.error('Error loading classes:', err)
        });
    }
  }

  getIcon(index: number): string {
    return CLASS_ICONS[index % CLASS_ICONS.length];
  }

  selectClass(c: any) {
    const classId = c.pkClassId || c.pk_class_id;
    const className = c.className || c.class_name || '';
    localStorage.setItem('classId', classId);
    localStorage.setItem('className', className);
    this.router.navigate(['/subject-view']);
  }

  goBack() {
    this.router.navigate(['/org-select']);
  }
}
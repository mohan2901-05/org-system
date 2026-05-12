import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ExamResultService, ExamResultSummary } from '../exam-result.service';

@Component({
  selector: 'app-result-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result-history.component.html',
  styleUrls: ['./result-history.component.css']
})
export class ResultHistoryComponent implements OnInit {

  results: ExamResultSummary[] = [];
  isLoading = true;
  error = '';

  constructor(
    private examService: ExamResultService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.examService.getMyResults().subscribe({
      next: (data) => {
        this.results = data;
        this.isLoading = false;
        this.cd.detectChanges();
      },
      error: () => {
        this.error = 'Could not load results. Is the backend running?';
        this.isLoading = false;
        this.cd.detectChanges();
      }
    });
  }

  getGradeColor(pct: number): string {
    if (pct >= 90) return '#10b981';
    if (pct >= 75) return '#6366f1';
    if (pct >= 50) return '#f59e0b';
    return '#ef4444';
  }

  getGradeLabel(pct: number): string {
    if (pct >= 90) return 'Excellent';
    if (pct >= 75) return 'Great';
    if (pct >= 50) return 'Good';
    return 'Needs Work';
  }

  formatDate(ts: string): string {
    return new Date(ts).toLocaleString('en-IN', {
      dateStyle: 'medium', timeStyle: 'short'
    });
  }

  goBack() { this.router.navigate(['/org-select']); }
}

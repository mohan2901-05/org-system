import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  result: any = {};
  details: any[] = [];
  percentage: number = 0;
  grade: string = '';
  gradeColor: string = '';
  showDetails: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const data = localStorage.getItem('result');
    if (data) {
      this.result = JSON.parse(data);
      this.details = this.result.details || [];
      this.percentage = this.result.percentage ??
        (this.result.total > 0 ? Math.round((this.result.score / this.result.total) * 1000) / 10 : 0);
      this.setGrade();
    }
  }

  private setGrade() {
    if (this.percentage >= 90)      { this.grade = 'Excellent';      this.gradeColor = '#10b981'; }
    else if (this.percentage >= 75) { this.grade = 'Great Job';      this.gradeColor = '#6366f1'; }
    else if (this.percentage >= 50) { this.grade = 'Good Effort';    this.gradeColor = '#f59e0b'; }
    else                            { this.grade = 'Keep Practicing'; this.gradeColor = '#ef4444'; }
  }

  retake()      { this.router.navigate(['/chapter-view']); }
  goToHistory() { this.router.navigate(['/my-results']); }
  goHome()      { this.router.navigate(['/org-select']); }
}
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ExamResultService } from '../exam-result.service';

@Component({
  selector: 'app-chapter-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chapter-view.html',
  styleUrls: ['./chapter-view.css']
})
export class ChapterView implements OnInit {

  chapters: any[] = [];
  qaList: any[] = [];
  subjectId: string | null = '';
  selectedChapterId: string | null = '';
  selectedChapterName: string = '';
  showQA: boolean = false;
  submitting: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cd: ChangeDetectorRef,
    private examResultService: ExamResultService
  ) {}

  ngOnInit(): void {
    this.subjectId = localStorage.getItem('subjectId');
    if (this.subjectId) {
      this.http.get<any[]>('http://localhost:8080/chapter?subjectId=' + this.subjectId)
        .subscribe({ next: (data) => { this.chapters = data; this.cd.detectChanges(); } });
    }
  }

  selectChapter(c: any) {
    this.selectedChapterId = c.pkChapterId || c.pk_chapter_id;
    this.selectedChapterName = c.chapterName || c.chapter_name || '';
    this.showQA = true;

    this.http.get<any[]>('http://localhost:8080/qa-by-chapter?chapterId=' + this.selectedChapterId)
      .subscribe(data => {
        this.qaList = data.sort(() => Math.random() - 0.5);
        this.qaList.forEach(q => {
          if (q.options) q.options = q.options.sort(() => Math.random() - 0.5);
        });
        this.cd.detectChanges();
      });
  }

  submitExam() {
    if (this.submitting) return;
    this.submitting = true;

    let score = 0;
    const detailedResult = this.qaList.map(q => {
      const isCorrect = q.userAnswer === q.correctAnswer;
      if (isCorrect) score++;
      return {
        question: q.question,
        correctAnswer: q.correctAnswer,
        userAnswer: q.userAnswer || 'Not Answered',
        isCorrect
      };
    });

    const percentage = this.qaList.length > 0
      ? Math.round((score / this.qaList.length) * 100 * 10) / 10
      : 0;

    // Payload for backend
    const payload = {
      fkOrgId:      localStorage.getItem('orgId')      || '',
      fkClassId:    localStorage.getItem('classId')    || '',
      fkSubjectId:  localStorage.getItem('subjectId')  || '',
      fkChapterId:  this.selectedChapterId              || '',
      orgName:      localStorage.getItem('orgName')     || '',
      className:    localStorage.getItem('className')   || '',
      subjectName:  localStorage.getItem('subjectName') || '',
      chapterName:  this.selectedChapterName,
      totalQuestions: this.qaList.length,
      score,
      percentage,
      resultDetails: JSON.stringify(detailedResult)
    };

    // Also store in localStorage so ResultComponent can read without an extra API call
    localStorage.setItem('result', JSON.stringify({
      total: this.qaList.length, score, percentage, details: detailedResult,
      chapterName: this.selectedChapterName,
      orgName: payload.orgName, className: payload.className, subjectName: payload.subjectName
    }));

    // Save to backend — navigate to result regardless of success/failure
    this.examResultService.saveResult(payload).subscribe({
      next: (saved: any) => {
        localStorage.setItem('lastResultId', saved.pkResultId || '');
        this.router.navigate(['/result']);
      },
      error: () => this.router.navigate(['/result'])
    });
  }

  goBackToChapters() { this.showQA = false; this.qaList = []; }
  goBack() { this.router.navigate(['/subject-view']); }
}
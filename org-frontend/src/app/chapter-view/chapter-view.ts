import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  showQA: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.subjectId = localStorage.getItem("subjectId");

    if (this.subjectId) {
      this.http.get<any[]>("http://localhost:8080/chapter?subjectId=" + this.subjectId)
        .subscribe(data => {
          this.chapters = data;
          this.cd.detectChanges();
        });
    }
  }

  selectChapter(c: any) {
    this.selectedChapterId = c.pkChapterId;
    this.showQA = true;

    this.http.get<any[]>(
      "http://localhost:8080/qa-by-chapter?chapterId=" + this.selectedChapterId
    ).subscribe(data => {

      // 🔥 SHUFFLE QUESTIONS
      this.qaList = data.sort(() => Math.random() - 0.5);

      // 🔥 SHUFFLE OPTIONS
      this.qaList.forEach(q => {
        if (q.options) {
          q.options = q.options.sort(() => Math.random() - 0.5);
        }
      });

      this.cd.detectChanges();
    });
  }

  submitExam() {

    let score = 0;

    const detailedResult = this.qaList.map(q => {

      const isCorrect = q.userAnswer === q.correctAnswer;

      if (isCorrect) score++;

      return {
        question: q.question,
        correctAnswer: q.correctAnswer,
        userAnswer: q.userAnswer || 'Not Answered',
        isCorrect: isCorrect
      };
    });

    const result = {
      total: this.qaList.length,
      score: score,
      details: detailedResult
    };

    localStorage.setItem("result", JSON.stringify(result));

    this.router.navigate(['/result']);
  }

  goBackToChapters() {
    this.showQA = false;
    this.qaList = [];
  }

  goBack() {
    this.router.navigate(['/subject-view']);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ExamResultSummary {
  pkResultId: string;
  orgName: string;
  className: string;
  subjectName: string;
  chapterName: string;
  totalQuestions: number;
  score: number;
  percentage: number;
  takenAt: string;
}

export interface ExamResultDetail extends ExamResultSummary {
  resultDetails: string;   // JSON string — parsed in component
}

@Injectable({ providedIn: 'root' })
export class ExamResultService {

  private BASE = 'http://localhost:8080/exam';

  constructor(private http: HttpClient) {}

  saveResult(payload: any): Observable<any> {
    return this.http.post(`${this.BASE}/result`, payload);
  }

  getMyResults(): Observable<ExamResultSummary[]> {
    return this.http.get<ExamResultSummary[]>(`${this.BASE}/results`);
  }

  getResultDetail(id: string): Observable<ExamResultDetail> {
    return this.http.get<ExamResultDetail>(`${this.BASE}/results/${id}`);
  }
}

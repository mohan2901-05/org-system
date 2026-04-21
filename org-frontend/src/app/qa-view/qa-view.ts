import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-qa-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qa-view.html'
})
export class QaView implements OnInit {

  qaList: any[] = [];
  chapterId: string | null = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.chapterId = localStorage.getItem("chapterId");

    console.log("CHAPTER ID IN QA:", this.chapterId);

    if (this.chapterId) {
      this.http.get<any[]>(
        "http://localhost:8080/qa-by-chapter?chapterId=" + this.chapterId
      ).subscribe(data => {

        console.log("QA DATA FROM API:", data);

        // 🔥 IMPORTANT FIX
        this.qaList = [...data];

        console.log("FINAL QA LIST:", this.qaList);
      });
    }
  }
}
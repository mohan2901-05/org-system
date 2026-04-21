import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrgService } from '../org.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qa-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './qa-form.html',
  styleUrls: ['./qa-form.css']
})
export class QaForm implements OnInit {

  qa = {
    id: '',
    chapterName: '',
    question: '',
    answer: ''
  };

  isEdit = false;
  successMessage = '';

  constructor(
    private service: OrgService,
    private router: Router
  ) { }

  ngOnInit(): void {

    const data = localStorage.getItem("qaEditData");

    if (data) {
      const obj = JSON.parse(data);

      this.qa = {
        id: obj.pkId,
        chapterName: obj.chapterName,
        question: obj.question,
        answer: obj.answer
      };

      this.isEdit = true;

      localStorage.removeItem("qaEditData");
    }
  }

  submit() {

    const payload = {
      pkId: this.qa.id,
      chapterName: this.qa.chapterName,
      question: this.qa.question,
      answer: this.qa.answer,
      status: "A",
      orgId: localStorage.getItem("orgId") // ✅ MUST
    };

    this.service.saveQA(payload).subscribe(() => {
      alert("Saved");
    });
  }


  resetForm() {
    this.qa = {
      id: '',
      chapterName: '',
      question: '',
      answer: ''
    };
    this.isEdit = false;
  }
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.component.html'
})
export class ResultComponent {

  result: any = {};

  constructor(private router: Router) {}

  ngOnInit() {
    const data = localStorage.getItem("result");
    if (data) {
      this.result = JSON.parse(data);
    }
  }

  retake() {
    this.router.navigate(['/chapter-view']);
  }
}
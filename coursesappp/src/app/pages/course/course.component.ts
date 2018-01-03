import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }


  onSave(title: string, date: Date, description: string, duration: number) {
    console.log(`${title}: ${date} ${description} ${duration}`);
  }
  onCancel() {
    this.location.back();
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { CourseDetailOverlayRef } from './course-delete-overlayref';
import { Course_Detail_Data } from './course-delete-overlay-data';
import { Course } from '../../courses';

@Component({
  selector: 'app-course-delete-overlay',
  templateUrl: './course-delete-overlay.component.html',
  styleUrls: ['./course-delete-overlay.component.css']
})
export class CourseDeleteOverlayComponent implements OnInit {

  constructor(
    public dialogRef: CourseDetailOverlayRef,
    @Inject(Course_Detail_Data) public course: Course) { }

  ngOnInit() {
  }

  noClick() {
    this.dialogRef.close();
  }

  yesClick() {
    this.dialogRef.delete();
  }

}

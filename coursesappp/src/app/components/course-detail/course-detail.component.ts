import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../courses';
import { CourseDeleteOverlayService } from '../../services/course-delete-overlay.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  @Input() course: Course;
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  nextPosition = 0;

  constructor(private deleteDialog: CourseDeleteOverlayService) { }

  ngOnInit() {
  }

  deleteCourse(course: Course) {
    const dialogRef = this.deleteDialog.open({ data: course });
    dialogRef.onDelete.subscribe(() => {
      this.onDelete.emit(course);
    });
  }
}





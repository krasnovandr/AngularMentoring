import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { Course } from '../../../../models/courses';
import { CourseDeleteOverlayService } from '../../../../services/course-delete-overlay.service';
import { SpinnerService } from '../../../../services/spinner.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseDetailComponent implements OnInit, OnChanges {

  @Input() course: Course;
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  nextPosition = 0;

  constructor(private deleteDialog: CourseDeleteOverlayService,
    ) { }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        const chng = changes[propName];
        const cur = JSON.stringify(chng.currentValue);
        const prev = JSON.stringify(chng.previousValue);
        // console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
      }
    }
  }

  ngOnInit() {
  }

  deleteCourse(course: Course) {
    const dialogRef = this.deleteDialog.open({ data: course });
    dialogRef.onDelete.subscribe(() => {
      this.onDelete.emit(course);
   
    });
  }

  editCourse(course: Course) {
    this.course.title = 'New Test Course Name';
  }
}





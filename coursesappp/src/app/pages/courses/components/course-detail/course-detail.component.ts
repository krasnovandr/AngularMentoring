import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { OnChanges } from '@angular/core';

import { Course } from '../../../../models/courses';
import { ConfirmationModalService } from '../../../../shared-components/confirmation-modal/confirmation-modal.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseDetailComponent implements OnInit, OnChanges {

  @Input() course: Course;
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private confirmationModalService: ConfirmationModalService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        const chng = changes[propName];
        const cur = JSON.stringify(chng.currentValue);
        const prev = JSON.stringify(chng.previousValue);
      }
    }
  }

  ngOnInit() {
  }

  deleteCourse(course: Course) {

    const result = this.confirmationModalService.open(`Do you really want to delete this course?.`);

    result.subscribe((response) => {
      if (response) {
        this.onDelete.emit(this.course);
      }
    });
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { Course } from '../../../../models/courses';
import { BaseModalService } from '../../../../shared-components/base-modal/base-modal.service';
import { ConfirmationModalService } from '../../../../shared-components/confirmation-modal/confirmation-modal.service';
import { CourseComponent } from '../../../course/course.component';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseDetailComponent {
  @Input() course: Course;
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private confirmationModalService: ConfirmationModalService,
    private baseModalService: BaseModalService,
    private injector: Injector
  ) { }

  // ngOnChanges(changes: SimpleChanges): void {
  //   for (const propName in changes) {
  //     if (changes.hasOwnProperty(propName)) {
  //       const chng = changes[propName];
  //       const cur = JSON.stringify(chng.currentValue);
  //       const prev = JSON.stringify(chng.previousValue);
  //     }
  //   }
  // }

  deleteCourse(course: Course) {
    const result = this.confirmationModalService.open(
      `Do you really want to delete this course?.`
    );

    result.subscribe(response => {
      if (response) {
        this.onDelete.emit(course);
      }
    });
  }

  editCourse(courseId: number) {
    this.baseModalService.open(CourseComponent, {
      componentInputParameters: [
        {
          name: 'courseId',
          value: courseId
        }
      ],
      modalInjector: this.injector
    });
  }
}

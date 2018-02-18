import { Injectable } from '@angular/core';
import { CanDeactivate, Router } from '@angular/router';

import { CourseComponent } from '../pages/course/course.component';
import { ConfirmationModalService } from '../shared-components/confirmation-modal/confirmation-modal.service';

@Injectable()
export class UnsavedFormGuard implements CanDeactivate<CourseComponent> {
    constructor(private navigateRouter: Router,
        private confirmationModalService: ConfirmationModalService) {
    }

    canDeactivate(component: CourseComponent) {
        if (!component.courseForm.dirty) {
            return true;
        }

        return this.confirmationModalService.open(`You have unsaved changes. Do you really want to proceed?`);
    }
}

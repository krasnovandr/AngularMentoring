import { async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { AppModule } from '../app.module';
import { CourseComponent } from '../pages/course/course.component';
import { BaseModalBodyLoaderService } from '../shared-components/base-modal/base-modal-body-loader.service';
import { BaseModalService } from '../shared-components/base-modal/base-modal.service';
import { ConfirmationModalService } from '../shared-components/confirmation-modal/confirmation-modal.service';
import { UnsavedFormGuard } from './unsaved-form.guard';
import { EventEmitter } from 'protractor';

describe('Unsaved Form Guard', () => {
    let unsavedFormGuard: UnsavedFormGuard;
    let courseComponent: CourseComponent;
    let confirmationModalService: ConfirmationModalService;
    const mockRouter = {
        navigate: jasmine.createSpy('navigate')
    };

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AppModule],
            providers: [
                UnsavedFormGuard,
                ConfirmationModalService,
                BaseModalService,
                BaseModalBodyLoaderService,
                { provide: Router, useValue: mockRouter },
            ]
        }).compileComponents(); // compile template and css
    }));

    beforeEach(() => {
        unsavedFormGuard = TestBed.get(UnsavedFormGuard);
        const fixture = TestBed.createComponent(CourseComponent);
        courseComponent = fixture.componentInstance;
        courseComponent.ngOnInit();
        confirmationModalService = TestBed.get(ConfirmationModalService);
    });

    it('should allow deactivation when the from is not dirty', () => {
        expect(unsavedFormGuard.canDeactivate(courseComponent)).toBe(true);
    });
    it('should open confirmation modal when the form is dirty and in case of positive result allow deactivate', () => {
        courseComponent.courseForm.markAsDirty();
        spyOn(confirmationModalService, 'open').and.returnValue(of(true));
        expect(unsavedFormGuard.canDeactivate(courseComponent)).toEqual(of(true));
    });
    it('should open confirmation modal when the form is dirty and in case of negative result not allow deactivate', () => {
        courseComponent.courseForm.markAsDirty();
        spyOn(confirmationModalService, 'open').and.returnValue(of(false));
        expect(unsavedFormGuard.canDeactivate(courseComponent)).toEqual(of(false));
    });
});

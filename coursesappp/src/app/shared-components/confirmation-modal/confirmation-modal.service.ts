import { Injector, Injectable, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseModalService } from '../base-modal/base-modal.service';
import { ConfirmationModalComponent } from './confirmation-modal.component';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ConfirmationModalService {
    constructor(private baseModalService: BaseModalService,
        private sanitizer: DomSanitizer,
        private injector: Injector) { }

    public open(confirmationText: string) {
        const result = new EventEmitter<boolean>();

        this.baseModalService.open(ConfirmationModalComponent, {
            componentInputParameters: [{
                name: 'confirmationText',
                value: confirmationText
            }, { name: 'response', value: result }],
            modalInjector: this.injector
        });

        return result;
    }
}

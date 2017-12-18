import { Output, EventEmitter } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';

export class SpinnerOverlayRef {
    @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
    constructor(private overlayRef: OverlayRef) { }

    close(): void {
        this.overlayRef.dispose();
    }
}

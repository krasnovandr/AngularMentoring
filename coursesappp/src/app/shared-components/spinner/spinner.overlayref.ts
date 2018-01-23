import { OverlayRef } from '@angular/cdk/overlay';
import { EventEmitter, Output } from '@angular/core';

export class SpinnerOverlayRef {
    @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
    constructor(private overlayRef: OverlayRef) { }

    close(): void {
        this.overlayRef.dispose();
    }
}

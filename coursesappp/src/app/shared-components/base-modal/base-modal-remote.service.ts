import { OverlayRef } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';

@Injectable()
export class BaseModalRemoteService {
    constructor(private overlayRef: OverlayRef) { }

    public close() {
        this.overlayRef.dispose();
    }
}

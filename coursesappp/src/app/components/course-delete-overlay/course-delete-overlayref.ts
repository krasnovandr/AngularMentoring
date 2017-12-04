import { OverlayRef } from '@angular/cdk/overlay';
import { Output, EventEmitter } from '@angular/core';

export class CourseDetailOverlayRef {
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }

  delete() {
    this.overlayRef.dispose();
    this.onDelete.emit();
  }
}

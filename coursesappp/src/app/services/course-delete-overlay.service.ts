import { Injectable, ComponentRef, Injector } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { PortalInjector, ComponentPortal } from '@angular/cdk/portal';
import { InjectionToken } from '@angular/core';

import { Course } from '../courses';
import { OverlayRef } from '@angular/cdk/overlay';
import { CourseDetailOverlayRef } from '../components/course-delete-overlay/course-delete-overlayref';
import { CourseDeleteOverlayComponent } from '../components/course-delete-overlay/course-delete-overlay.component';
import { Course_Detail_Data } from '../components/course-delete-overlay/course-delete-overlay-data';


interface CourseDeleteOverlayConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  data?: Course;
}

const DEFAULT_CONFIG: CourseDeleteOverlayConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'tm-file-preview-dialog-panel'
};

@Injectable()
export class CourseDeleteOverlayService {

  constructor(private injector: Injector, private overlay: Overlay) { }

  open(config: CourseDeleteOverlayConfig = {}) {
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    const overlayRef = this.createOverlay(dialogConfig);

    const dialogRef = new CourseDetailOverlayRef(overlayRef);

    const overlayComponent = this.attachDialogContainer(overlayRef, dialogConfig, dialogRef);

    overlayRef.backdropClick().subscribe(_ => dialogRef.close());

    return dialogRef;
  }

  private attachDialogContainer(overlayRef: OverlayRef, config: CourseDeleteOverlayConfig, dialogRef: CourseDetailOverlayRef) {
    const injector = this.createInjector(config, dialogRef);

    const containerPortal = new ComponentPortal(CourseDeleteOverlayComponent, null, injector);
    const containerRef: ComponentRef<CourseDeleteOverlayComponent> = overlayRef.attach(containerPortal);

    return containerRef.instance;
  }

  private createOverlay(config: CourseDeleteOverlayConfig) {
    // Returns an OverlayConfig
    const overlayConfig = this.getOverlayConfig(config);

    // Returns an OverlayRef
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: CourseDeleteOverlayConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy,
    });

    return overlayConfig;
  }

  private createInjector(config: CourseDeleteOverlayConfig, dialogRef: CourseDetailOverlayRef): PortalInjector {
    // Instantiate new WeakMap for our custom injection tokens
    const injectionTokens = new WeakMap();

    // Set custom injection tokens
    injectionTokens.set(CourseDetailOverlayRef, dialogRef);
    injectionTokens.set(Course_Detail_Data, config.data);

    // Instantiate new PortalInjector
    return new PortalInjector(this.injector, injectionTokens);
  }
}

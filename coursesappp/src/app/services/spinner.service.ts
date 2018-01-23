import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { PortalInjector } from '@angular/cdk/portal';
import { ComponentRef, Injectable, Injector } from '@angular/core';

import { SpinnerComponent } from '../shared-components/spinner/spinner.component';
import { SpinnerOverlayRef } from '../shared-components/spinner/spinner.overlayref';

interface SpinnerOverlayConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
}

const DEFAULT_CONFIG: SpinnerOverlayConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'tm-file-preview-dialog-panel'
};
@Injectable()
export class SpinnerService {

  constructor(private injector: Injector, private overlay: Overlay) { }

  start() {
    const spinnerConfig = DEFAULT_CONFIG;
    const overlayRef = this.createOverlay(spinnerConfig);

    const dialogRef = new SpinnerOverlayRef(overlayRef);

    const overlayComponent = this.attachDialogContainer(overlayRef, spinnerConfig, dialogRef);

    // overlayRef.backdropClick().subscribe(_ => dialogRef.close());

    return dialogRef;
  }

  private attachDialogContainer(overlayRef: OverlayRef, config: SpinnerOverlayConfig, dialogRef: SpinnerOverlayRef) {
    const injector = this.createInjector(config, dialogRef);

    const containerPortal = new ComponentPortal(SpinnerComponent, null, injector);
    const containerRef: ComponentRef<SpinnerComponent> = overlayRef.attach(containerPortal);

    return containerRef.instance;
  }

  private createOverlay(config: SpinnerOverlayConfig) {
    // Returns an OverlayConfig
    const overlayConfig = this.getOverlayConfig(config);

    // Returns an OverlayRef
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: SpinnerOverlayConfig): OverlayConfig {
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

  private createInjector(config: SpinnerOverlayConfig, dialogRef: SpinnerOverlayRef): PortalInjector {
    // Instantiate new WeakMap for our custom injection tokens
    const injectionTokens = new WeakMap();

    // Set custom injection tokens
    injectionTokens.set(SpinnerOverlayRef, dialogRef);
    // injectionTokens.set(Course_Detail_Data, config.data);

    // Instantiate new PortalInjector
    return new PortalInjector(this.injector, injectionTokens);
  }

}

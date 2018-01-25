import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector, Type } from '@angular/core';

import { BaseModalBodyLoaderService, IComponentInputParameters } from './base-modal-body-loader.service';
import { BaseModalRemoteService } from './base-modal-remote.service';
import {
  BaseModalComponent,
  BODY_COMPONENT,
  COMPONENT_INPUT_PARAMETERS,
  LOADER_SERVICE,
  REMOTE_SERVICE,
} from './base-modal.component';

export interface BaseModalConfig {
  hasBackdrop?: boolean;
  backdropClass?: string;
  modalInjector?: Injector;
  componentInputParameters?: IComponentInputParameters[];
}

const DEFAULT_MODAL_CONFIG: BaseModalConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  modalInjector: null,
  componentInputParameters: [],
};

@Injectable()
export class BaseModalService {
  private modalInjector: Injector;
  private overlayRef: OverlayRef;

  constructor(private overlay: Overlay,
    public baseModalBodyLoaderService: BaseModalBodyLoaderService) { }

  public open(bodyComponent: Type<{}>, customConfig: BaseModalConfig = {}) {
    const modalConfig = { ...DEFAULT_MODAL_CONFIG, ...customConfig };

    this.modalInjector = modalConfig.modalInjector;

    this.overlayRef = this.createOverlayRef(modalConfig);

    this.attachDialogContainer(this.overlayRef, modalConfig, bodyComponent, modalConfig.componentInputParameters);

    return this.overlayRef;
  }

  public close() {
    this.overlayRef.dispose();
  }

  private attachDialogContainer(overlayRef: OverlayRef,
    modalConfig: BaseModalConfig,
    bodyComponent,
    componentInputParameters: IComponentInputParameters[]) {
    const injector = this.createModalInjector(modalConfig, overlayRef, bodyComponent, componentInputParameters);

    const containerPortal = new ComponentPortal(BaseModalComponent, null, injector);
    overlayRef.attach(containerPortal);

    overlayRef.backdropClick().subscribe((): void => this.close());
  }

  private createModalInjector(config: BaseModalConfig,
    overlayRef: OverlayRef,
    bodyComponent,
    componentInputParameters: IComponentInputParameters[]): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(BODY_COMPONENT, bodyComponent);
    injectionTokens.set(LOADER_SERVICE, this.baseModalBodyLoaderService);
    injectionTokens.set(REMOTE_SERVICE, new BaseModalRemoteService(overlayRef));
    injectionTokens.set(COMPONENT_INPUT_PARAMETERS, componentInputParameters);

    return new PortalInjector(this.modalInjector, injectionTokens);
  }

  private createOverlayRef(modalConfig: BaseModalConfig): OverlayRef {
    const overlayConfig = this.getOverlayConfig(modalConfig);

    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(modalConfig: BaseModalConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: modalConfig.hasBackdrop,
      backdropClass: modalConfig.backdropClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }
}



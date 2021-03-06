import { ESCAPE } from '@angular/cdk/keycodes';
import { Component, HostListener, Inject, InjectionToken, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';

import { BaseModalBodyLoaderService, IComponentInputParameters } from './base-modal-body-loader.service';
import { BaseModalRemoteService } from './base-modal-remote.service';

export const BODY_COMPONENT = new InjectionToken<Component>('bodyComponent');
export const COMPONENT_INPUT_PARAMETERS = new InjectionToken<Component>('componentInputParameters');
export const LOADER_SERVICE = new InjectionToken<Function>('serviceLoader');
export const REMOTE_SERVICE = new InjectionToken<Function>('remoteService');

@Component({
  selector: 'app-base-modal',
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.css'],
  providers: [BaseModalRemoteService, BaseModalBodyLoaderService]
})

export class BaseModalComponent implements OnInit {
  @ViewChild('dynamic', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  @HostListener('document:keydown', ['$event'])
  private handleKeydown(event: KeyboardEvent) {
    if (event.keyCode === ESCAPE) {
      this.baseModalRemoteService.close();
    }
  }

  constructor( @Inject(BODY_COMPONENT) private bodyComponent: Type<{}>,
    @Inject(LOADER_SERVICE) private baseModalBodyLoaderService: BaseModalBodyLoaderService,
    @Inject(REMOTE_SERVICE) private baseModalRemoteService: BaseModalRemoteService,
    @Inject(COMPONENT_INPUT_PARAMETERS) private componentInputParameters?: IComponentInputParameters[]) { }

  ngOnInit() {
    this.baseModalBodyLoaderService.setRootViewContainerRef(this.viewContainerRef);
    this.baseModalBodyLoaderService.addBodyComponent(this.bodyComponent, this.componentInputParameters);
  }

  close(): void {
    this.baseModalRemoteService.close();
  }
}

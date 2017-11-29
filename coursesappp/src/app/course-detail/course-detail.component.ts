import {
  Component, OnInit, Input, Output, EventEmitter, ViewContainerRef, QueryList,
  ViewChild,
  ViewChildren, ViewEncapsulation
} from '@angular/core';
import { Course } from '../courses';
import { CdkOverlayOrigin, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { CdkPortal, ComponentPortal, Portal } from '@angular/cdk/portal';


import { filter } from 'rxjs/operators/filter';
import { tap } from 'rxjs/operators/tap';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  @Input() course: Course;
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  nextPosition = 0;
  isMenuOpen: boolean = false;

  @ViewChildren(CdkPortal) templatePortals: QueryList<Portal<any>>;
  @ViewChild(CdkOverlayOrigin) _overlayOrigin: CdkOverlayOrigin;
  @ViewChild('tortelliniOrigin') tortelliniOrigin: CdkOverlayOrigin;
  @ViewChild('tortelliniTemplate') tortelliniTemplate: CdkPortal;
  constructor(public overlay: Overlay, public viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
  }

  deleteCourse(course: Course) {
    alert(course.title);
    this.onDelete.emit(course);
  }

  openRotiniPanel() {
    let config = new OverlayConfig();

    config.positionStrategy = this.overlay.position()
      .global()
      .left(`${this.nextPosition}px`)
      .top(`${this.nextPosition}px`);

    this.nextPosition += 30;

    let overlayRef = this.overlay.create(config);
    overlayRef.attach(new ComponentPortal(RotiniPanel, this.viewContainerRef));
  }

  openFusilliPanel() {
    let config = new OverlayConfig();

    config.positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .top(`${this.nextPosition}px`);

    this.nextPosition += 30;

    let overlayRef = this.overlay.create(config);
    overlayRef.attach(this.templatePortals.first);
  }

  openSpaghettiPanel() {
    // TODO(jelbourn): separate overlay demo for connected positioning.
    let strategy = this.overlay.position()
      .connectedTo(
      this._overlayOrigin.elementRef,
      { originX: 'start', originY: 'bottom' },
      { overlayX: 'start', overlayY: 'top' });

    let config = new OverlayConfig({ positionStrategy: strategy });
    let overlayRef = this.overlay.create(config);

    overlayRef.attach(new ComponentPortal(SpagettiPanel, this.viewContainerRef));
  }

  openTortelliniPanel() {
    let strategy = this.overlay.position()
      .connectedTo(
      this.tortelliniOrigin.elementRef,
      { originX: 'start', originY: 'bottom' },
      { overlayX: 'end', overlayY: 'top' });

    let config = new OverlayConfig({ positionStrategy: strategy });
    let overlayRef = this.overlay.create(config);

    overlayRef.attach(this.tortelliniTemplate);
  }

  openPanelWithBackdrop() {
    let config = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy: this.overlay.position().global().centerHorizontally()
    });

    let overlayRef = this.overlay.create(config);
    overlayRef.attach(this.templatePortals.first);
    overlayRef.backdropClick().subscribe(() => overlayRef.detach());
  }

  openKeyboardTracking() {
    let config = new OverlayConfig();

    config.positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .top(`${this.nextPosition}px`);

    this.nextPosition += 30;

    let overlayRef = this.overlay.create(config);
    const componentRef = overlayRef
      .attach(new ComponentPortal(KeyboardTrackingPanel, this.viewContainerRef));

    overlayRef.keydownEvents()
      .pipe(
      tap(e => componentRef.instance.lastKeydown = e.key),
      filter(e => e.key === 'Escape')
      ).subscribe(() => overlayRef.detach());
  }

}

/** Simple component to load into an overlay */
@Component({
  moduleId: module.id,
  selector: 'rotini-panel',
  template: '<p class="demo-rotini">Rotini {{value}}</p>'
})
export class RotiniPanel {
  value: number = 9000;
}

/** Simple component to load into an overlay */
@Component({
  selector: 'spagetti-panel',
  template: '<div class="demo-spagetti">Spagetti {{value}}</div>'
})
export class SpagettiPanel {
  value: string = 'Omega';
}

/** Simple component to load into an overlay */
@Component({
  selector: 'keyboard-panel',
  template: '<div class="demo-keyboard">Last Keydown: {{ lastKeydown }}</div>'
})
export class KeyboardTrackingPanel {
  lastKeydown = '';
}





import { Directive, ElementRef, Input, SimpleChanges, Renderer, OnInit } from '@angular/core';

@Directive({
  selector: '[appColoredborder]'
})
export class ColoredborderDirective implements OnInit {
  @Input() courseCreatedDate: Date;

  constructor(private el: ElementRef, private renderer: Renderer) {

  }

  ngOnInit() {
    const currentDate = new Date();
    const freshBaseLineDate = new Date();
    freshBaseLineDate.setDate(freshBaseLineDate.getDate() - 14);

    if (this.courseCreatedDate < currentDate && this.courseCreatedDate >= freshBaseLineDate) {
      this.setBorderColor('green');
    }

    if (this.courseCreatedDate > currentDate) {
      this.setBorderColor('blue');
    }
  }

  private setBorderColor(color: string) {
    this.renderer.setElementStyle(this.el.nativeElement, 'border-color', color);

  }
}

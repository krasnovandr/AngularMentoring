import { ColoredborderDirective } from './coloredborder.directive';
import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
@Component({
  template: `<div appColoredborder [courseCreatedDate]="testDate">`
})
class TestColorBorderComponent {
  testDate: Date;
}
describe('ColoredborderDirective', () => {
  let component: TestColorBorderComponent;
  let fixture: ComponentFixture<TestColorBorderComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestColorBorderComponent, ColoredborderDirective]
    });
    fixture = TestBed.createComponent(TestColorBorderComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('div'));
  });

  it('should create an instance', () => {
    component.testDate = new Date('12/12/2019');
    fixture.detectChanges();
    expect(inputEl.nativeElement.style.borderColor).toBe('blue');
  });
});

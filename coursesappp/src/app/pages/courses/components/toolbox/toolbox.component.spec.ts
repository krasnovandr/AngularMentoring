import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolboxComponent } from './toolbox.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BaseModalService } from '../../../../shared-components/base-modal/base-modal.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { BaseModalBodyLoaderService } from '../../../../shared-components/base-modal/base-modal-body-loader.service';

describe('ToolboxComponent', () => {
  let component: ToolboxComponent;
  let fixture: ComponentFixture<ToolboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, OverlayModule],
      providers: [BaseModalService, BaseModalBodyLoaderService],
      declarations: [ToolboxComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize search form control', () => {
    expect(component.searchBar.value).toEqual('');
  });
});

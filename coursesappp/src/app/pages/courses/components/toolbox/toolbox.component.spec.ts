import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolboxComponent } from './toolbox.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BaseModalService } from '../../../../shared-components/base-modal/base-modal.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { BaseModalBodyLoaderService } from '../../../../shared-components/base-modal/base-modal-body-loader.service';

describe('ToolboxComponent', () => {
  let component: ToolboxComponent;
  let fixture: ComponentFixture<ToolboxComponent>;
  let baseModalService: BaseModalService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, OverlayModule],
      providers: [BaseModalService, BaseModalBodyLoaderService],
      declarations: [ToolboxComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolboxComponent);
    component = fixture.componentInstance;
    baseModalService = TestBed.get(BaseModalService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize search form control', () => {
    expect(component.searchBar.value).toEqual('');
  });
  it('should trigger opening course add dialog', () => {
    spyOn(baseModalService, "open");

    component.openAddCourse();

    expect(baseModalService.open).toHaveBeenCalled();
  });
  it('should emit search action when search button was clicked and query is not empty', () => {
    spyOn(component.onSearch, "emit");
    let searchQuery = 'query';
    component.search(searchQuery);

    expect(component.onSearch.emit).toHaveBeenCalledWith(searchQuery);
  });
  it('should not emit search action when search button was clicked and query is empty', () => {
    spyOn(component.onSearch, "emit");
    let searchQuery = '';
    component.search(searchQuery);

    expect(component.onSearch.emit).toHaveBeenCalledTimes(0);
  });
  it('should emit search action when query was changed to empty state', () => {
    spyOn(component.onSearch, "emit");
    let searchQuery = '';
    component.ngOnInit();
    component.searchBar.setValue(searchQuery);
    expect(component.onSearch.emit).toHaveBeenCalledWith(searchQuery);
  });



});

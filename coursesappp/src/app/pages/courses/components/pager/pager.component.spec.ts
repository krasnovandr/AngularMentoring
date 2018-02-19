import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PagerComponent } from './pager.component';
import { FormsModule } from '@angular/forms';



describe('PagerComponent', () => {
    let component: PagerComponent;
    let fixture: ComponentFixture<PagerComponent>;
 
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [PagerComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PagerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

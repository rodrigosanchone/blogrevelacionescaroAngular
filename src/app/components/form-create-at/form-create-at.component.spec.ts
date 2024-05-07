import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateAtComponent } from './form-create-at.component';

describe('FormCreateAtComponent', () => {
  let component: FormCreateAtComponent;
  let fixture: ComponentFixture<FormCreateAtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCreateAtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCreateAtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

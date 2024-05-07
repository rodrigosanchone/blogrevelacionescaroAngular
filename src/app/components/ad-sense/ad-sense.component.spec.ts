import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdSenseComponent } from './ad-sense.component';

describe('AdSenseComponent', () => {
  let component: AdSenseComponent;
  let fixture: ComponentFixture<AdSenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdSenseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdSenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

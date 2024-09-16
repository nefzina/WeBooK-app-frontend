import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBackOfficeComponent } from './admin-back-office.component';

describe('AdminBackOfficeComponent', () => {
  let component: AdminBackOfficeComponent;
  let fixture: ComponentFixture<AdminBackOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBackOfficeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

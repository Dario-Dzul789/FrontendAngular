import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PVComponent } from './pv.component';

describe('PVComponent', () => {
  let component: PVComponent;
  let fixture: ComponentFixture<PVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PVComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyConsultations } from './my-consultations';

describe('MyConsultations', () => {
  let component: MyConsultations;
  let fixture: ComponentFixture<MyConsultations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyConsultations],
    }).compileComponents();

    fixture = TestBed.createComponent(MyConsultations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

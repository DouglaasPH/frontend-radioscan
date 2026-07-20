import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConsultationAppointmentSlot } from './new-consultation-appointment-slot';

describe('NewConsultationAppointmentSlot', () => {
  let component: NewConsultationAppointmentSlot;
  let fixture: ComponentFixture<NewConsultationAppointmentSlot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewConsultationAppointmentSlot],
    }).compileComponents();

    fixture = TestBed.createComponent(NewConsultationAppointmentSlot);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

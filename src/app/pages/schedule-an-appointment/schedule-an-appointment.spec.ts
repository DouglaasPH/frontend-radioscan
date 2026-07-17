import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleAnAppointment } from './schedule-an-appointment';

describe('ScheduleAnAppointment', () => {
  let component: ScheduleAnAppointment;
  let fixture: ComponentFixture<ScheduleAnAppointment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleAnAppointment],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleAnAppointment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConsultationDetails } from './view-consultation-details';

describe('ViewConsultationDetails', () => {
  let component: ViewConsultationDetails;
  let fixture: ComponentFixture<ViewConsultationDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewConsultationDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewConsultationDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

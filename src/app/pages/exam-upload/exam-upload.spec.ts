import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamUpload } from './exam-upload';

describe('ExamUpload', () => {
  let component: ExamUpload;
  let fixture: ComponentFixture<ExamUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamUpload],
    }).compileComponents();

    fixture = TestBed.createComponent(ExamUpload);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

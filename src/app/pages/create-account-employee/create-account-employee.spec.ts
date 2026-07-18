import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountEmployee } from './create-account-employee';

describe('CreateAccountEmployee', () => {
  let component: CreateAccountEmployee;
  let fixture: ComponentFixture<CreateAccountEmployee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAccountEmployee],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAccountEmployee);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

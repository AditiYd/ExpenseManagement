import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeExpenseComponent } from './employee-expense.component';

describe('EmployeeExpenseComponent', () => {
  let component: EmployeeExpenseComponent;
  let fixture: ComponentFixture<EmployeeExpenseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeExpenseComponent]
    });
    fixture = TestBed.createComponent(EmployeeExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

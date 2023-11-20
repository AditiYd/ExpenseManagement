import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerReceiptComponent } from './manager-receipt.component';

describe('ManagerReceiptComponent', () => {
  let component: ManagerReceiptComponent;
  let fixture: ComponentFixture<ManagerReceiptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerReceiptComponent]
    });
    fixture = TestBed.createComponent(ManagerReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryReadComponent } from './inventory-read.component';

describe('InventoryReadComponent', () => {
  let component: InventoryReadComponent;
  let fixture: ComponentFixture<InventoryReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

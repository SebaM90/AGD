import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrToolComponent } from './qr-tool.component';

describe('QrToolComponent', () => {
  let component: QrToolComponent;
  let fixture: ComponentFixture<QrToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

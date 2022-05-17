import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendcaptureComponent } from './trendcapture.component';

describe('TrendcaptureComponent', () => {
  let component: TrendcaptureComponent;
  let fixture: ComponentFixture<TrendcaptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendcaptureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendcaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

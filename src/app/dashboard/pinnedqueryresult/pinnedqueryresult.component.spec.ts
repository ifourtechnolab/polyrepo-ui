import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinnedqueryComponent } from './pinnedqueryresult.component';

describe('PinnedqueryComponent', () => {
  let component: PinnedqueryComponent;
  let fixture: ComponentFixture<PinnedqueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinnedqueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinnedqueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

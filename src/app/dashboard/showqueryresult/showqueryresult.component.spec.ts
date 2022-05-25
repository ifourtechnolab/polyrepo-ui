import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowqueryresultComponent } from './showqueryresult.component';

describe('ShowqueryresultComponent', () => {
  let component: ShowqueryresultComponent;
  let fixture: ComponentFixture<ShowqueryresultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowqueryresultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowqueryresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

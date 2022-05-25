import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowquerydetailsComponent } from './showquerydetails.component';

describe('ShowquerydetailsComponent', () => {
  let component: ShowquerydetailsComponent;
  let fixture: ComponentFixture<ShowquerydetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowquerydetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowquerydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

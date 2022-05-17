import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedqueryComponent } from './savedqueryresult.component';

describe('SavedqueryComponent', () => {
  let component: SavedqueryComponent;
  let fixture: ComponentFixture<SavedqueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedqueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedqueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

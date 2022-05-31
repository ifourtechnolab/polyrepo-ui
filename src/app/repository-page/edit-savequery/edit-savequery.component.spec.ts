import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSavequeryComponent } from './edit-savequery.component';

describe('EditSavequeryComponent', () => {
  let component: EditSavequeryComponent;
  let fixture: ComponentFixture<EditSavequeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSavequeryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSavequeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

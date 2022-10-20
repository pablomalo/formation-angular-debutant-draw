import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleFormComponent } from './circle-form.component';

describe('CircleFormComponent', () => {
  let component: CircleFormComponent;
  let fixture: ComponentFixture<CircleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

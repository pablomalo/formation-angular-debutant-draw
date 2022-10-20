import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangleFormComponent } from './rectangle-form.component';

describe('RectangleComponent', () => {
  let component: RectangleFormComponent;
  let fixture: ComponentFixture<RectangleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RectangleFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RectangleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

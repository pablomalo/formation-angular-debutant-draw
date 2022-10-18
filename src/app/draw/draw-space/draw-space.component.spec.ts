import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawSpaceComponent } from './draw-space.component';

describe('DrawSpaceComponent', () => {
  let component: DrawSpaceComponent;
  let fixture: ComponentFixture<DrawSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawSpaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawActionsComponent } from './draw-actions.component';

describe('DrawActionsComponent', () => {
  let component: DrawActionsComponent;
  let fixture: ComponentFixture<DrawActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DrawActionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

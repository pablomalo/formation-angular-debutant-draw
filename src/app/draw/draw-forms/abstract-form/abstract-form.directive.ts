import { Directive, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DrawService } from '../../services/draw.service';
import { IShapeCommand } from '../../draw-actions/interfaces/shape-command.interface';

@Directive()
export abstract class AbstractFormDirective implements OnInit {
  @Input() parentForm!: FormGroup;
  @Input() submitEvent$!: Observable<void>;
  private _unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private readonly drawService: DrawService) {}

  ngOnInit(): void {
    this.addControls();

    this.submitEvent$.pipe(takeUntil(this._unsubscribe$)).subscribe(() => {
      this.onSubmit();
    });
  }

  onSubmit(): void {
    this.drawService.addShape(this.buildShape());
  }

  protected abstract addControls(): void;

  protected abstract buildShape(): IShapeCommand;
}

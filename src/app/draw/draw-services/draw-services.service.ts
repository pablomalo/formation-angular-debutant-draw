import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrawServicesService {
  private readonly _penState$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public get penState(): BehaviorSubject<boolean> {
    return this._penState$;
  }

  togglePen: Function = (): void =>
    this._penState$.next(!this._penState$.value);
}

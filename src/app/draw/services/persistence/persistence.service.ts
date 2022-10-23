import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DrawService } from '../draw/draw.service';
import { SavingStatus } from '../../draw-actions/draw-actions.component';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  private _cachedDrawing: any = {};

  constructor(
    private readonly drawService: DrawService,
    private readonly http: HttpClient
  ) {}

  list = (): Observable<object> =>
    this.http.get(`${environment.apiUrl}/drawings`);

  save = (savingStatus: SavingStatus): void => {
    const drawing: object = this.drawService.canvasFabric.toObject();
    if (this._isChanged(drawing)) {
      this._cachedDrawing = this._stripId(drawing);
      savingStatus.processing = true;
      this.http
        .post(`${environment.apiUrl}/drawings`, drawing)
        .subscribe(() => {
          savingStatus.processing = false;
        });
    }
  };

  private _isChanged = (drawing: object): boolean => {
    return (
      JSON.stringify(this._cachedDrawing) !==
      JSON.stringify(this._stripId(drawing))
    );
  };

  private _stripId = (drawing: object): object => {
    const strippedDrawing = {
      id: undefined,
      ...drawing,
    };
    delete strippedDrawing.id;
    return strippedDrawing;
  };
}

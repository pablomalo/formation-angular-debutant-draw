import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DrawService } from '../draw/draw.service';

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

  save = (): void => {
    const drawing: object = this.drawService.canvasFabric.toObject();
    if (this._isChanged(drawing)) {
      this._cachedDrawing = this._stripId(drawing);
      this.http.post(`${environment.apiUrl}/drawings`, drawing).subscribe();
    }
  };

  _isChanged = (drawing: object): boolean => {
    return (
      JSON.stringify(this._cachedDrawing) !==
      JSON.stringify(this._stripId(drawing))
    );
  };

  _stripId = (drawing: object): any => {
    const strippedDrawing = {
      id: undefined,
      ...drawing,
    };
    delete strippedDrawing.id;
    return strippedDrawing;
  };
}

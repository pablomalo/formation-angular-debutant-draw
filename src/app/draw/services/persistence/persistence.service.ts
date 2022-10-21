import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DrawService } from '../draw/draw.service';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  private _cachedShape: any = {};

  constructor(
    private readonly drawService: DrawService,
    private readonly http: HttpClient
  ) {}

  list = (): Observable<object> =>
    this.http.get(`${environment.apiUrl}/shapes`);

  save = (): void => {
    const shape: object = this.drawService.canvasFabric.toObject();
    console.log(shape);
    if (this._isChanged(shape)) {
      this._cachedShape = this._stripId(shape);
      this.http.post(`${environment.apiUrl}/shapes`, shape).subscribe();
    }
  };

  _isChanged = (shape: object): boolean => {
    return (
      JSON.stringify(this._cachedShape) !== JSON.stringify(this._stripId(shape))
    );
  };

  _stripId = (shape: object): any => {
    const strippedShape = {
      id: undefined,
      ...shape,
    };
    delete strippedShape.id;
    return strippedShape;
  };
}

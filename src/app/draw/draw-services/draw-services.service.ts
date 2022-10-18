import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DrawServicesService {
  penState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  penStateChange: Function = () => (this.penState.next(!this.penState.value));
}

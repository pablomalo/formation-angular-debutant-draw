import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-life-cycle',
  templateUrl: './life-cycle.component.html',
  styleUrls: ['./life-cycle.component.scss'],
})
export class LifeCycleComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit
{
  @Input() externalMod: boolean = false;

  constructor() {
    console.log('Life-cycle constructor!', this.externalMod);
  }

  ngOnInit(): void {
    console.log('Life-cycle ngOnInit!', this.externalMod);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`Life-cycle ngOnChanges: ${JSON.stringify(changes)}`);
  }

  ngDoCheck(): void {
    console.log('Life-cycle ngDoCheck!');
  }

  ngAfterContentInit(): void {
    console.log('Life-cycle ngAfterContentInit!');
  }

  ngAfterContentChecked(): void {
    console.log('Life-cycle ngAfterContentChecked!');
  }

  ngAfterViewInit(): void {
    console.log('Life-cycle ngAfterViewInit!');
  }
}

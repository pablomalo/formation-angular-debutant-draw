import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appBtnActive]',
})
export class ButtonActiveDirective implements OnChanges {
  @Input() appBtnActive: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    this.el.nativeElement.classList.toggle('active', this.appBtnActive);
  }
}

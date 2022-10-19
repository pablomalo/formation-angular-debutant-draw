import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[btnActive]',
})
export class ButtonActiveDirective implements OnChanges {
  @Input() btnActive: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    this.el.nativeElement.classList.toggle('active', this.btnActive);
  }
}

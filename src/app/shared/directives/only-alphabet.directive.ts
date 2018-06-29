import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[OnlyAlphabets]'
})
export class OnlyAlphabets {
  // Allow decimal numbers. The \. is only allowed once to occur
  private regex: RegExp = new RegExp(/^[a-zA-Z ]*$/);

  @Input() ngModel: string;

  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', '.'];

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home  and dash keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      if (this.ngModel) {
        const index = this.ngModel.indexOf('-');
        const indexOfDot = this.ngModel.indexOf('.');
        if (event.key === '-' && this.ngModel) {
          if (index >= 0) {
            event.preventDefault();
          }
          if (index === -1 && event.key === '-') {
            return;
          }
        } else if (event.key === '.' && this.ngModel) {
          if (indexOfDot >= 0) {
            event.preventDefault();
          }
          if (indexOfDot === -1 && event.key === '.') {
            return;
          }
        } else {
          return;
        }
      }
    }

    const e = <KeyboardEvent>event;
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}

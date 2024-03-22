import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appLeave]'
})
export class LeaveDirective {

  @Input('appLeave') canLeave: boolean = true;

  @HostListener('window:beforeunload', ['$event'])
  onLeave($event) {
    if (!this.canLeave) {
      $event.preventDefault();
      return false;
    }
    return true;
  }

  
}

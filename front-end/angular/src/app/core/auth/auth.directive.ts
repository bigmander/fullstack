import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuthDirective]'
})
export class AuthDirective {

  constructor(
    private authService: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  private shouldShow = false;

  ngOnInit() {
    
    const condition = this.authService.isAuthenticated();

    if (condition && !this.shouldShow) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.shouldShow = true;
    } else if (!condition && this.shouldShow) {
      this.viewContainer.clear();
      this.shouldShow = false;
    }
  }
}

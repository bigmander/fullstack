import { Component } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass']
})
export class LogoutComponent {

  constructor(
    private loginService: LoginService,
  ) { }

  logout(): void {
    this.loginService.logout();
    window.location.href = "/posts";
  }

}

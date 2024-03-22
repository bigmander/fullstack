import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.sass']
})
export class AvatarComponent {
  @Input() author = 'test@test.com'
  @Input() bgColor = this.getRandomBgColor();


  constructor(
    private utilitiesService: UtilitiesService
  ) { }

  getRandomBgColor() {
    const red = this.utilitiesService.getRandomFromRange(0, 255),
      green = this.utilitiesService.getRandomFromRange(0, 255),
      blue = this.utilitiesService.getRandomFromRange(0, 255);

    return `rgb(${red},${green},${blue})`
  }

}

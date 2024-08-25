import {Component} from "@angular/core";
import {UserService} from "../../user.service";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: "app-profile-info",
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: "./profile-info.component.html"
})
export class ProfileInfoComponent {
  user = this.userService.currentUser;

  constructor(
    private readonly userService: UserService
  ) {
  }
}

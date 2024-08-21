import {Component} from "@angular/core";
import {UserService} from "../../user.service";

@Component({
  selector: "app-profile-info",
  standalone: true,
  imports: [],
  templateUrl: "./profile-info.component.html"
})
export class ProfileInfoComponent {
  user = this.userService.currentUser;

  constructor(
    private readonly userService: UserService
  ) {
  }
}

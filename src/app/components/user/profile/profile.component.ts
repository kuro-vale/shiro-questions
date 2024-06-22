import {Component, effect} from "@angular/core";
import {UserService} from "../user.service";
import {Title} from "@angular/platform-browser";
import {AsyncPipe} from "@angular/common";
import {BaseComponent} from "../../base/base.component";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: "./profile.component.html"
})
export class ProfileComponent extends BaseComponent {
  user = this.userService.currentUser;

  constructor(private readonly userService: UserService, title: Title) {
    super();
    effect(() => {
      title.setTitle(`${this.user()?.username} | shiro-questions`);
    });
  }
}

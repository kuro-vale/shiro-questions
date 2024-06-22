import {Component, effect, OnInit} from "@angular/core";
import {UserService} from "../user.service";
import {Meta, Title} from "@angular/platform-browser";
import {AsyncPipe} from "@angular/common";
import {BaseComponent} from "../../base/base.component";
import {MetaConstants} from "../../../constants";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: "./profile.component.html"
})
export class ProfileComponent extends BaseComponent implements OnInit {
  user = this.userService.currentUser;

  constructor(
    private readonly userService: UserService,
    title: Title,
    private readonly meta: Meta
  ) {
    super();
    effect(() => {
      title.setTitle(`${this.user()?.username || $localize`:@@profile_title:Your profile`} | shiro-questions`);
    });
  }

  ngOnInit() {
    this.meta.updateTag({
      name: MetaConstants.Description,
      content: $localize`:@@profile_desc:Your personal profile in shiro-questions!`
    });
  }
}

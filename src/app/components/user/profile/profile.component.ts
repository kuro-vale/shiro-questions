import {Component, effect, OnInit} from "@angular/core";
import {UserService} from "../user.service";
import {Meta, Title} from "@angular/platform-browser";
import {BaseComponent} from "../../base/base.component";
import {MetaConstants, Paths} from "../../../constants";
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {Router, RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [
    MatTabNav,
    MatTabNavPanel,
    MatTabLink,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: "./profile.component.html",
  styleUrl: "profile.component.css"
})
export class ProfileComponent extends BaseComponent implements OnInit {
  user = this.userService.currentUser;
  url = this.router.url;
  protected readonly Paths = Paths;

  constructor(
    private readonly userService: UserService,
    title: Title,
    private readonly meta: Meta,
    private readonly router: Router,
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

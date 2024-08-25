import {Component} from "@angular/core";
import {MatIcon} from "@angular/material/icon";
import {Icons, Paths} from "../../constants";
import {Router, RouterModule} from "@angular/router";
import {NgClass} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuContent, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatDialog} from "@angular/material/dialog";
import {RegisterComponent} from "../user/register/register.component";
import {LoginComponent} from "../user/login/login.component";
import {BaseComponent} from "../base/base.component";
import {UserService} from "../user/user.service";
import {AskQuestionComponent} from "../question/ask-question/ask-question.component";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [MatIcon, RouterModule, NgClass, MatIconButton, MatMenu, MatMenuTrigger, MatMenuItem, MatButton, MatMenuContent],
  templateUrl: "./navbar.component.html",
})
export class NavbarComponent extends BaseComponent {
  user = this.userService.currentUser;
  focused = false;
  protected readonly Icons = Icons;
  protected readonly Paths = Paths;

  constructor(
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly userService: UserService
  ) {
    super();
  }

  get onRegisterPage() {
    return this.router.url.endsWith(Paths.Register);
  }

  get onLoginPage() {
    return this.router.url.endsWith(Paths.Login);
  }

  async openRegisterDialog() {
    if (this.onRegisterPage || this.onLoginPage) {
      await this.router.navigate([Paths.Register]);
      return;
    }
    this.dialog.open(RegisterComponent);
  }

  async openLoginDialog() {
    if (this.onLoginPage || this.onRegisterPage) {
      await this.router.navigate([Paths.Login]);
      return;
    }
    this.dialog.open(LoginComponent);
  }

  async openAskQuestionDialog() {
    if (!this.user()) {
      await this.router.navigate([Paths.Register]);
      return;
    }
    this.dialog.open(AskQuestionComponent, {backdropClass: "bg-[--navbar]"});
  }

  async logout() {
    this.userService.logout();
    await this.router.navigate([Paths.Home]);
  }
}

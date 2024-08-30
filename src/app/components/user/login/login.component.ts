import {Component, OnInit} from "@angular/core";
import {MatDialog, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {UserFormComponent} from "../user-form/user-form.component";
import {RegisterComponent} from "../register/register.component";
import {BaseComponent} from "../../base/base.component";
import {takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {MetaConstants, Paths} from "../../base/constants";
import {NgComponentOutlet, NgTemplateOutlet} from "@angular/common";
import {UserService} from "../user.service";
import {Meta} from "@angular/platform-browser";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    UserFormComponent,
    NgComponentOutlet,
    NgTemplateOutlet
  ],
  templateUrl: "./login.component.html",
})
export class LoginComponent extends BaseComponent implements OnInit {
  constructor(
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly meta: Meta,
  ) {
    super();
  }

  get onLoginPage() {
    return this.router.url.includes(Paths.Login);
  }

  ngOnInit(): void {
    this.userService.clearCurrentUser();
    if (this.onLoginPage) {
      this.meta.updateTag({
        name: MetaConstants.Description,
        content: $localize`:@@login_desc:Log in to the best place for asking your questions`
      });
    }
  }

  async openNext() {
    if (this.onLoginPage) {
      await this.router.navigate([Paths.Register]);
      return;
    }
    this.dialog.open(RegisterComponent).afterOpened().pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.dialog.openDialogs.forEach(d => {
          if (d.componentInstance instanceof LoginComponent) {
            d.close();
          }
        });
      });
  }
}

import {Component, OnInit} from "@angular/core";
import {MatDialog, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {UserFormComponent} from "../user-form/user-form.component";
import {RegisterComponent} from "../register/register.component";
import {BaseComponent} from "../../base/base.component";
import {takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {Paths} from "../../../constants";
import {NgComponentOutlet, NgTemplateOutlet} from "@angular/common";
import {UserService} from "../user.service";

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
  onLoginPage = this.router.url.endsWith(Paths.Login);

  constructor(
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly userService: UserService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.userService.clearCurrentUser();
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

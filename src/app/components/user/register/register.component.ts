import {Component, OnInit} from "@angular/core";
import {MatDialog, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {UserFormComponent} from "../user-form/user-form.component";
import {LoginComponent} from "../login/login.component";
import {BaseComponent} from "../../base/base.component";
import {takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {MetaConstants, Paths} from "../../base/constants";
import {NgTemplateOutlet} from "@angular/common";
import {UserService} from "../user.service";
import {Meta} from "@angular/platform-browser";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    UserFormComponent,
    NgTemplateOutlet,
  ],
  templateUrl: "./register.component.html"
})
export class RegisterComponent extends BaseComponent implements OnInit {
  constructor(
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly meta: Meta,
  ) {
    super();
  }

  get onRegisterPage() {
    return this.router.url.includes(Paths.Register);
  }

  ngOnInit(): void {
    this.userService.clearCurrentUser();
    if (this.onRegisterPage) {
      this.meta.updateTag({
        name: MetaConstants.Description,
        content: $localize`:@@register_desc:Register to the best place for asking your questions`
      });
    }
  }

  async openNext() {
    if (this.onRegisterPage) {
      await this.router.navigate([Paths.Login]);
      return;
    }
    this.dialog.open(LoginComponent).afterOpened().pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.dialog.openDialogs.forEach(d => {
          if (d.componentInstance instanceof RegisterComponent) {
            d.close();
          }
        });
      });
  }
}

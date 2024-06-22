import {Component} from "@angular/core";
import {MatDialog, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {UserFormComponent} from "../user-form/user-form.component";
import {LoginComponent} from "../login/login.component";
import {BaseComponent} from "../../../shared/base.component";
import {takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {Paths} from "../../../shared/constants";
import {NgTemplateOutlet} from "@angular/common";

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
export class RegisterComponent extends BaseComponent {
  onRegisterPage = this.router.url.endsWith(Paths.Register);

  constructor(
    private readonly dialog: MatDialog,
    private readonly router: Router,
  ) {
    super();
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

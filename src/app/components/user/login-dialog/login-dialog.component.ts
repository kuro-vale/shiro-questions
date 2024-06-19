import {Component} from "@angular/core";
import {MatDialog, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {UserFormComponent} from "../user-form/user-form.component";
import {UserService} from "../user.service";
import {UserRequest} from "../user";
import {RegisterDialogComponent} from "../register-dialog/register-dialog.component";

@Component({
  selector: "app-login-dialog",
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    UserFormComponent
  ],
  templateUrl: "./login-dialog.component.html",
})
export class LoginDialogComponent {
  constructor(private readonly userService: UserService, private readonly dialog: MatDialog) {
  }

  onSubmit(request: UserRequest) {
    this.userService.login(request);
  }

  openNext() {
    this.dialog.open(RegisterDialogComponent).afterOpened().subscribe(() => {
      this.dialog.openDialogs.forEach(d => {
        if (d.componentInstance instanceof LoginDialogComponent) {
          d.close();
        }
      });
    });
  }
}

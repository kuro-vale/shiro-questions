import {Component} from "@angular/core";
import {MatDialog, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {UserFormComponent} from "../user-form/user-form.component";
import {UserService} from "../user.service";
import {UserRequest} from "../user";
import {LoginDialogComponent} from "../login-dialog/login-dialog.component";

@Component({
  selector: "app-register-dialog",
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    UserFormComponent,
  ],
  templateUrl: "./register-dialog.component.html"
})
export class RegisterDialogComponent {
  constructor(private readonly userService: UserService, private readonly dialog: MatDialog) {
  }

  onSubmit(request: UserRequest) {
    this.userService.register(request);
  }

  openNext() {
    this.dialog.open(LoginDialogComponent).afterOpened().subscribe(() => {
      this.dialog.openDialogs.forEach(d => {
        if (d.componentInstance instanceof RegisterDialogComponent) {
          d.close();
        }
      });
    });
  }
}

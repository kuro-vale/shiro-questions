import {Component} from "@angular/core";
import {MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {UserFormComponent} from "../user-form/user-form.component";
import {UserService} from "../user.service";
import {UserRequest} from "../user";

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
  constructor(private readonly userService: UserService) {
  }

  onSubmit(request: UserRequest) {
    this.userService.login(request);
  }
}

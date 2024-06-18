import {Component} from "@angular/core";
import {MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {UserFormComponent} from "../user-form/user-form.component";
import {UserService} from "../user.service";
import {UserRequest} from "../user";

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
  constructor(private readonly userService: UserService) {
  }

  onSubmit(request: UserRequest) {
    this.userService.register(request);
  }
}

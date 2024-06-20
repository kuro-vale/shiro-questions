import {Component, Input} from "@angular/core";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {UserService} from "../user.service";
import {UserRequest} from "../user";
import {BaseComponent} from "../../../shared/BaseComponent";
import {takeUntil} from "rxjs";

@Component({
  selector: "app-user-form",
  standalone: true,
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatCheckbox
  ],
  templateUrl: "./user-form.component.html",
})
export class UserFormComponent extends BaseComponent {
  userForm = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9]*$/),
      Validators.minLength(3),
      Validators.maxLength(18)
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9]*$/),
      Validators.minLength(5),
      Validators.maxLength(10)
    ]),
    rememberMe: new FormControl(false)
  });

  userNameErrorMessages: { [key: string]: string } = {
    required: $localize`:@@error_username_required:Username is required`,
    pattern: $localize`:@@error_alphanumeric_pattern:Only letters and numbers are valid`,
    minlength: $localize`:@@error_username_minlength:Username must be greater than 3 characters long`,
    maxlength: $localize`:@@error_username_maxlength:Username must be less than 18 characters long`
  };

  passwordErrorMessages: { [key: string]: string } = {
    required: $localize`:@@error_password_required:Password is required`,
    pattern: $localize`:@@error_alphanumeric_pattern:Only letters and numbers are valid`,
    minlength: $localize`:@@error_password_minlength:Password must be greater than 5 characters long`,
    maxlength: $localize`:@@error_password_maxlength:Password must be less than 10 characters long`
  };

  @Input({required: true})
  isLogin!: boolean;

  constructor(private readonly userService: UserService) {
    super();
  }

  get usernameErrorMessage() {
    const key = Object.keys(this.userForm.controls.username.errors ?? {})[0];
    return this.userNameErrorMessages[key];
  }

  get passwordErrorMessage() {
    const key = Object.keys(this.userForm.controls.password.errors ?? {})[0];
    return this.passwordErrorMessages[key];
  }

  submit() {
    if (this.userForm.invalid) {
      return;
    }
    if (this.isLogin) {
      this.userService.login(this.userForm.value as UserRequest)
        .pipe(takeUntil(this.destroy$))
        .subscribe(credentials => {
          console.log(credentials);
        });
      return;
    }
    this.userService.register(this.userForm.value as UserRequest)
      .pipe(takeUntil(this.destroy$))
      .subscribe(credentials => {
        console.log(credentials);
      });
  }
}

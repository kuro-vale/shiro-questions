import {Component, Input, OnInit} from "@angular/core";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {UserService} from "../user.service";
import {UserAuth, UserRequest} from "../user";
import {BaseComponent} from "../../../shared/base.component";
import {takeUntil} from "rxjs";
import {AppError} from "../../../shared/types";

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
export class UserFormComponent extends BaseComponent implements OnInit {
  loading = false;
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
    maxlength: $localize`:@@error_username_maxlength:Username must be less than 18 characters long`,
    invalidCredentials: $localize`:@@error_credentials:Invalid credentials`
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

  ngOnInit(): void {
    this.userForm.controls.password.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.userForm.controls.username.updateValueAndValidity();
      });
  }

  submit() {
    if (this.userForm.invalid) {
      return;
    }

    this.loading = true;
    const request = this.userForm.value as UserRequest;
    const key$ = this.isLogin
      ? this.userService.login(request)
      : this.userService.register(request);
    key$.pipe(takeUntil(this.destroy$))
      .subscribe((credentials) => this.loginUser(credentials));
  }

  loginUser(credentials: UserAuth | AppError) {
    this.loading = false;
    if (credentials.error) {
      this.userForm.controls.username.setErrors(credentials.validationErrors ?? null);
    } else {
      // TODO: set current user
      console.log(credentials.token);
    }
  }
}

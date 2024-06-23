import {ComponentFixture, TestBed} from "@angular/core/testing";

import {UserFormComponent} from "./user-form.component";
import {provideHttpClient} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
import {UserService} from "../user.service";
import {of} from "rxjs";

describe("UserFormComponent", () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    userService = jasmine.createSpyObj<UserService>(["login", "register", "setCurrentUser"]);
    await TestBed.configureTestingModule({
      imports: [UserFormComponent],
      providers: [provideHttpClient(), provideAnimations(),
        {provide: UserService, useValue: userService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.userForm.patchValue({username: "userTest", password: "passTest"});
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should handle password change on invalid credentials error", () => {
    component.userForm.controls.username.setErrors({invalidCredentials: true});
    component.userForm.controls.password.setValue("change");
    expect(component.userForm.controls.username.hasError("invalidCredentials")).toBeFalse();
  });

  it("should not submit on invalid form", () => {
    component.userForm.reset();
    component.submit();
    expect(userService.login).toHaveBeenCalledTimes(0);
    expect(userService.register).toHaveBeenCalledTimes(0);
  });

  it("should handle login errors", () => {
    component.isLogin = true;
    userService.login.and.returnValue(of({
      error: true,
      validationErrors: {
        invalidCredentials: true
      }
    }));
    component.submit();
    expect(component.userForm.controls.username.hasError("invalidCredentials")).toBeTrue();
  });

  it("should handle register errors", () => {
    component.isLogin = false;
    userService.register.and.returnValue(of({
      error: true,
      validationErrors: {
        usernameTaken: true
      }
    }));
    component.submit();
    expect(component.userForm.controls.username.hasError("usernameTaken")).toBeTrue();
  });

  it("should login after success submit", () => {
    component.isLogin = false;
    userService.register.and.returnValue(of({
      error: false,
      username: "userTest",
      token: "tokenTest"
    }));
    component.submit();
    expect(userService.setCurrentUser).toHaveBeenCalled();
  });
});

import {TestBed} from "@angular/core/testing";

import {UserService} from "./user.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {UserAuth, UserRequest} from "./user";
import {of, throwError} from "rxjs";
import {TokenService} from "../token/token.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

describe("UserService", () => {
  let service: UserService;
  let client: jasmine.SpyObj<HttpClient>;
  const request: UserRequest = {username: "userTest", password: "passwordTest", rememberMe: true};
  const response: UserAuth = {
    username: "userTest",
    error: false,
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJUZXN0In0.uddqyNYZNMkI7zxnvKfWsMPr08TcDm7uJ1XmVKAfPTw"
  };
  let tokenService: TokenService;
  let router: Router;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    client = jasmine.createSpyObj<HttpClient>(["post"]);
    snackBar = jasmine.createSpyObj<MatSnackBar>(["open"]);
    TestBed.configureTestingModule({
      providers: [
        UserService, {provide: HttpClient, useValue: client},
        {provide: MatSnackBar, useValue: snackBar}
      ]
    });
    tokenService = TestBed.inject(TokenService);
    router = TestBed.inject(Router);
    service = TestBed.inject(UserService);
    tokenService.clearToken();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should register user", (done) => {
    client.post.and.returnValue(of(response));
    service.register(request).subscribe(r => {
      expect(r).toBe(response);
      done();
    });
  });

  it("should handle register error", (done) => {
    client.post.and.callFake(() => {
      return throwError(() => new HttpErrorResponse({
        error: {reason: "username already taken"}
      }));
    });
    service.register(request).subscribe(r => {
      expect(r.error).toBeTrue();
      done();
    });
  });

  it("should login user", (done) => {
    client.post.and.returnValue(of(response));
    service.login(request).subscribe(r => {
      expect(r).toBe(response);
      done();
    });
  });

  it("should handle login error", (done) => {
    client.post.and.callFake(() => {
      return throwError(() => new HttpErrorResponse({
        error: {reason: "invalid credentials"}
      }));
    });
    service.login(request).subscribe(r => {
      expect(r.error).toBeTrue();
      done();
    });
  });

  it("should set current user", () => {
    const navigateSpy = spyOn(router, "navigate");
    service.setCurrentUser(response, false);
    expect(tokenService.token).toBe(response.token);
    expect(service.currentUser()).toBe(response);
    expect(navigateSpy).toHaveBeenCalled();
  });

  it("#getCurrentUser should return null on empty token", () => {
    const user = service.getCurrentUser();
    expect(user).toBeNull();
  });

  it("#getCurrentUser should decode token", () => {
    tokenService.saveToken(response.token, false);
    const user = service.getCurrentUser();
    expect(user?.username).toBe(response.username);
  });

  it("#getCurrentUser should catch decode errors", () => {
    tokenService.saveToken("userToken", false);
    const user = service.getCurrentUser();
    expect(user).toBeNull();
  });

  it("#clearCurrentUser should clear user", () => {
    service.clearCurrentUser();
    expect(service.currentUser()).toBeNull();
  });

  it("should handle unauthorized errors", (done) => {
    client.post.and.callFake(() => {
      return throwError(() => new HttpErrorResponse({
        status: 401
      }));
    });
    const navigateSpy = spyOn(router, "navigate");
    service.login(request).subscribe(r => {
      expect(r.error).toBeTrue();
      expect(navigateSpy).toHaveBeenCalled();
      expect(snackBar.open.calls.count()).toBe(1);
      done();
    });
  });

  it("should handle unexpected errors", (done) => {
    client.post.and.callFake(() => {
      return throwError(() => new HttpErrorResponse({
        status: 500
      }));
    });
    service.register(request).subscribe(r => {
      expect(r.error).toBeTrue();
      expect(snackBar.open.calls.count()).toBe(1);
      done();
    });
  });
});

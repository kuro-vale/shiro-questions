import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User, UserAuth, UserRequest} from "./user";
import {BaseService} from "../../shared/base.service";
import {catchError, Observable, of, share} from "rxjs";
import {AppError} from "../../shared/types";
import {Router} from "@angular/router";
import {Paths, StorageConstants} from "../../shared/constants";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class UserService extends BaseService {
  private readonly endpoint = "/auth";
  private readonly userErrors: { [key: string]: () => Promise<AppError> } = {
    "invalid credentials": async () => {
      return {
        validationErrors: {
          invalidCredentials: true,
        },
        error: true
      };
    },
    "username already taken": async () => {
      return {
        validationErrors: {
          usernameTaken: true,
        },
        error: true
      };
    }
  };

  constructor(
    private readonly client: HttpClient,
    router: Router,
    snackBar: MatSnackBar) {
    super(snackBar, router);
  }

  register(request: UserRequest): Observable<UserAuth | AppError> {
    return this.client.post<UserAuth>(`${this.apiUrl}${this.endpoint}/register`, request)
      .pipe(catchError(err => this.mapError(err, this.userErrors, $localize`:@@error_fail_register:Error while registering`)));
  }

  login(request: UserRequest): Observable<UserAuth | AppError> {
    return this.client.post<UserAuth>(`${this.apiUrl}${this.endpoint}/login`, request)
      .pipe(catchError(err => this.mapError(err, this.userErrors, $localize`:@@error_fail_login:Error while logging in`)));
  }

  async setCurrentUser(credentials: UserAuth, rememberMe: boolean) {
    if (isPlatformBrowser(this.platformId)) {
      rememberMe
        ? localStorage.setItem(StorageConstants.Token, credentials.token)
        : sessionStorage.setItem(StorageConstants.Token, credentials.token);
    }
    this.loggedUser = credentials;
    await this.router.navigate([Paths.Profile]);
  }

  getCurrentUser() {
    if (this.loggedUser) return of(this.loggedUser);
    return this.client.get<User | null>(`${this.apiUrl}${this.endpoint}/me`)
      .pipe(
        share(),
        catchError((err, caught) => {
          this.mapError(err, {}, $localize``);
          this.clearLoggedUser();
          caught = of(null);
          return caught;
        }));
  }
}

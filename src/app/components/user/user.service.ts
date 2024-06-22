import {Injectable, signal} from "@angular/core";
import {User, UserAuth, UserRequest} from "./user";
import {BaseService} from "../base/base.service";
import {catchError, Observable, of, tap} from "rxjs";
import {AppError} from "../../types";
import {Paths} from "../../constants";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: "root"
})
export class UserService extends BaseService {
  currentUser = signal<User | null>(null);
  private readonly endpoint = "/auth";
  private readonly userErrors: { [key: string]: () => AppError } = {
    "invalid credentials": () => {
      return {
        validationErrors: {
          invalidCredentials: true,
        },
        error: true
      };
    },
    "username already taken": () => {
      return {
        validationErrors: {
          usernameTaken: true,
        },
        error: true
      };
    }
  };

  constructor() {
    super();
  }

  register(request: UserRequest): Observable<UserAuth | AppError> {
    return this.client.post<UserAuth>(`${this.apiUrl}${this.endpoint}/register`, request)
      .pipe(catchError(err => this.mapError(err, $localize`:@@error_fail_register:Error while registering`, this.userErrors)));
  }

  login(request: UserRequest): Observable<UserAuth | AppError> {
    return this.client.post<UserAuth>(`${this.apiUrl}${this.endpoint}/login`, request)
      .pipe(catchError(err => this.mapError(err, $localize`:@@error_fail_login:Error while logging in`, this.userErrors)));
  }

  async setCurrentUser(credentials: UserAuth, rememberMe: boolean) {
    this.tokenService.saveToken(credentials.token, rememberMe);
    this.currentUser.set(credentials);
    await this.router.navigate([Paths.Profile]);
  }

  getCurrentUser() {
    const token = this.tokenService.token;
    if (!token) return of(null);
    const decoded = jwtDecode(token);
    if (decoded) {
      this.currentUser.set(decoded as User);
      return of(decoded as User);
    }
    return this.client.get<User | null>(`${this.apiUrl}${this.endpoint}/me`)
      .pipe(
        catchError((err, caught) => {
          this.mapError(err, $localize`:@@error_current_user:Error getting your data, please log in again`);
          this.tokenService.clearToken();
          this.router.navigate([Paths.Login]).then();
          caught = of(null);
          return caught;
        }),
        tap(u => this.currentUser.set(u))
      );
  }

  clearCurrentUser() {
    this.currentUser.set(null);
  }
}

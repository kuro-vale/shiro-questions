import {Injectable, signal} from "@angular/core";
import {User, UserAuth, UserRequest} from "./user";
import {BaseService} from "../base/base.service";
import {catchError, Observable} from "rxjs";
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

  getCurrentUser(): User | null {
    const token = this.tokenService.token;
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      this.currentUser.set(decoded as User);
      return decoded as User;
    } catch (_) {
      this.tokenService.clearToken();
      this.clearCurrentUser();
      return null;
    }
  }

  clearCurrentUser() {
    this.currentUser.set(null);
  }
}

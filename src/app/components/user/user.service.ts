import {Injectable, signal} from "@angular/core";
import {User, UserAuth, UserRequest} from "./user";
import {catchError, Observable} from "rxjs";
import {AppError} from "../../types";
import {apiUrl, Paths} from "../../constants";
import {jwtDecode} from "jwt-decode";
import {HttpClient} from "@angular/common/http";
import {ErrorService} from "../base/error/error.service";
import {TokenService} from "../token/token.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UserService {
  currentUser = signal<User | null>(null);
  private readonly endpoint = `${apiUrl}/auth`;
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

  constructor(
    private readonly client: HttpClient,
    private readonly tokenService: TokenService,
    private readonly errorService: ErrorService,
    private readonly router: Router
  ) {
  }

  register(request: UserRequest): Observable<UserAuth | AppError> {
    return this.client.post<UserAuth>(`${this.endpoint}/register`, request)
      .pipe(catchError(err => this.errorService.mapError(err, $localize`:@@error_fail_register:Error while registering`, this.userErrors)));
  }

  login(request: UserRequest): Observable<UserAuth | AppError> {
    return this.client.post<UserAuth>(`${this.endpoint}/login`, request)
      .pipe(catchError(err => this.errorService.mapError(err, $localize`:@@error_fail_login:Error while logging in`, this.userErrors)));
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

import {Injectable} from "@angular/core";
import {User, UserAuth, UserRequest} from "./user";
import {BaseService} from "../../shared/base.service";
import {catchError, map, Observable, of, share} from "rxjs";
import {AppError} from "../../shared/types";
import {Paths} from "../../shared/constants";

@Injectable({
  providedIn: "root"
})
export class UserService extends BaseService {
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
  private loggedUser: User | null = null;

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
    this.loggedUser = credentials;
    await this.router.navigate([Paths.Profile]);
  }

  getCurrentUser() {
    if (!this.tokenService.token) return of(null);
    if (this.loggedUser) return of(this.loggedUser);
    return this.client.get<User | null>(`${this.apiUrl}${this.endpoint}/me`)
      .pipe(
        share(),
        map(u => this.loggedUser = u),
        catchError((err, caught) => {
          this.mapError(err, $localize`:@@error_current_user:Error getting your data, please log in again`);
          this.tokenService.clearToken();
          caught = of(null);
          return caught;
        }));
  }
}

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserAuth, UserRequest} from "./user";
import {BaseService} from "../../shared/base.service";
import {catchError, Observable} from "rxjs";
import {AppError} from "../../shared/types";

@Injectable({
  providedIn: "root"
})
export class UserService extends BaseService {
  private readonly endpoint = "/auth";

  constructor(private readonly client: HttpClient, snackBar: MatSnackBar) {
    super(snackBar);
  }

  register(request: UserRequest): Observable<UserAuth | AppError> {
    return this.client.post<UserAuth>(`${this.apiUrl}${this.endpoint}/register`, request)
      .pipe(catchError(err => this.mapError(err, $localize`:@@error_fail_register:Error while registering`)));
  }

  login(request: UserRequest): Observable<UserAuth | AppError> {
    return this.client.post<UserAuth>(`${this.apiUrl}${this.endpoint}/login`, request)
      .pipe(catchError(err => this.mapError(err, $localize`:@@error_fail_login:Error while logging in`)));
  }
}

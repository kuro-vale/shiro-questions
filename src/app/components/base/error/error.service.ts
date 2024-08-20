import {Injectable} from "@angular/core";
import {AppError} from "../../../types";
import {Observable, of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {Paths} from "../../../constants";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TokenService} from "../../token/token.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class ErrorService {

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly tokenService: TokenService,
    private readonly router: Router,
  ) {
  }

  showError(message: string) {
    this.snackBar.open(message, "", {duration: 5000});
  }

  mapError(
    error: any,
    message: string,
    knownErrors: { [key: string]: () => AppError },
  ): Observable<AppError> {
    const defaultError: AppError = {
      validationErrors: {},
      error: true
    };
    if (error instanceof HttpErrorResponse) {
      if (Object.hasOwn(knownErrors, error.error?.reason)) {
        return of(knownErrors[error.error.reason]());
      }
      if (error.status === 401) {
        return fromPromise(this.unauthorizedError());
      }
    }
    this.showError(message);
    return of(defaultError);
  }

  async unauthorizedError(): Promise<AppError> {
    this.tokenService.clearToken();
    const message = $localize`:@@error_unauthorized:Please, log in to do this`;
    await this.router.navigate([Paths.Login], {replaceUrl: true});
    this.showError(message);
    return {
      error: true,
      validationErrors: {}
    };
  }
}

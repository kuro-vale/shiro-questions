import {environment} from "../../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable, of} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AppError} from "../../types";
import {Paths} from "../../constants";
import {inject} from "@angular/core";
import {TokenService} from "../token/token.service";
import {Router} from "@angular/router";
import {fromPromise} from "rxjs/internal/observable/innerFrom";

export abstract class BaseService {
  protected readonly apiUrl = new URL(environment.apiUrl).origin;
  protected readonly snackBar = inject(MatSnackBar);
  protected readonly client = inject(HttpClient);
  protected readonly tokenService = inject(TokenService);
  protected readonly router = inject(Router);

  protected constructor() {
  }

  protected showError(message: string) {
    this.snackBar.open(message, "", {duration: 5000});
  }

  protected mapError(
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

  private async unauthorizedError(): Promise<AppError> {
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

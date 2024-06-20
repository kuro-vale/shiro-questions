import {environment} from "../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable, of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {AppError} from "./types";

export abstract class BaseService {
  protected readonly apiUrl = new URL(environment.apiUrl).origin;
  private readonly errorMap: { [key: string]: () => AppError } = {
    "invalid credentials": () => {
      return {
        validationErrors: {
          invalidCredentials: true,
        },
        error: true
      };
    },
    "Unauthorized": () => {
      const message = $localize`:@@error_unauthorized:Please, log in to do this`;
      this.showError(message);
      return {
        message,
        error: true
      };
    }
  };

  protected constructor(private readonly snackBar: MatSnackBar) {
  }

  protected showError(message: string) {
    this.snackBar.open(message, "", {duration: 5000});
  }

  protected mapError(error: any, defaultMessage: string): Observable<AppError> {
    let appError: AppError = {
      message: defaultMessage,
      error: true
    };
    if (error instanceof HttpErrorResponse) {
      if (this.errorMap[error.error?.reason])
        return of(this.errorMap[error.error.reason]());
    }
    this.showError(appError.message!);
    return of(appError);
  }
}

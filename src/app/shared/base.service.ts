import {environment} from "../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable, of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {AppError} from "./types";
import {Router} from "@angular/router";
import {Paths, StorageConstants} from "./constants";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {User} from "../components/user/user";
import {inject, PLATFORM_ID} from "@angular/core";
import {isPlatformBrowser} from "@angular/common";

export abstract class BaseService {
  protected readonly apiUrl = new URL(environment.apiUrl).origin;
  protected readonly platformId = inject(PLATFORM_ID);
  protected loggedUser: User | null = null;
  private readonly commonErrors: { [key: string]: () => Promise<AppError> } = {
    "Unauthorized": async () => {
      this.clearLoggedUser();
      const message = $localize`:@@error_unauthorized:Please, log in to do this`;
      if (isPlatformBrowser(this.platformId)) {
        await this.router.navigate([Paths.Home], {queryParams: {login: true}, replaceUrl: true});
        this.showError(message);
      }
      return {
        message,
        error: true
      };
    }
  };

  protected constructor(protected readonly snackBar: MatSnackBar, protected readonly router: Router) {
  }

  protected clearLoggedUser() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(StorageConstants.Token);
      localStorage.removeItem(StorageConstants.Token);
    }
    this.loggedUser = null;
  }

  protected showError(message: string) {
    this.snackBar.open(message, "", {duration: 5000});
  }

  protected mapError(
    error: any,
    knownErrors: { [key: string]: () => Promise<AppError> },
    defaultMessage: string
  ): Observable<AppError> {
    let appError: AppError = {
      message: defaultMessage,
      error: true
    };
    if (error instanceof HttpErrorResponse) {
      const mapErrors = {...knownErrors, ...this.commonErrors};
      if (Object.hasOwn(mapErrors, error.error?.reason)) {
        return fromPromise(mapErrors[error.error.reason]());
      }
    }
    this.showError(appError.message!);
    return of(appError);
  }
}

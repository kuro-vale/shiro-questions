import {Inject, Injectable, PLATFORM_ID} from "@angular/core";
import {isPlatformBrowser} from "@angular/common";
import {StorageConstants} from "../../constants";

@Injectable({
  providedIn: "root"
})
export class TokenService {
  private localStorage: Storage | null = null;
  private sessionStorage: Storage | null = null;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    if (isPlatformBrowser(platformId)) {
      this.localStorage = localStorage;
      this.sessionStorage = sessionStorage;
    }
  }

  private _token: string | null = null;
  get token(): string | null {
    this._token ??= this.localStorage?.getItem(StorageConstants.Token)
      ?? this.sessionStorage?.getItem(StorageConstants.Token) ?? null;
    return this._token;
  }

  private set token(value: string | null) {
    this._token = value;
  }

  saveToken(value: string, rememberMe: boolean) {
    rememberMe ? this.localStorage?.setItem(StorageConstants.Token, value)
      : this.sessionStorage?.setItem(StorageConstants.Token, value);
    this._token = value;
  }

  clearToken() {
    this.sessionStorage?.removeItem(StorageConstants.Token);
    this.localStorage?.removeItem(StorageConstants.Token);
    this.token = null;
  }
}

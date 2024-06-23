import {TestBed} from "@angular/core/testing";

import {TokenService} from "./token.service";
import {StorageConstants} from "../../constants";

describe("TokenService", () => {
  let service: TokenService;
  let token = "TOKEN";

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should get token", () => {
    sessionStorage.setItem(StorageConstants.Token, token);
    expect(service.token).toBe(token);
  });

  it("should save token on sessionStorage", () => {
    const newValue = "sessionStorage";
    service.saveToken(newValue, false);
    expect(sessionStorage.getItem(StorageConstants.Token)).toBe(newValue);
  });

  it("should save token on localStorage", () => {
    const newValue = "localStorage";
    service.saveToken(newValue, true);
    expect(localStorage.getItem(StorageConstants.Token)).toBe(newValue);
  });

  it("should clear token", () => {
    service.clearToken();
    expect(service.token).toBeNull();
  });

  afterEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });
});

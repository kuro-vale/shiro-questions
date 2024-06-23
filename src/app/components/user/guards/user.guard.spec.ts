import {TestBed} from "@angular/core/testing";
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from "@angular/router";

import {userGuard} from "./user.guard";
import {TokenService} from "../../token/token.service";

describe("userGuard", () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => userGuard(...guardParameters));
  let tokenService: TokenService;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    tokenService = TestBed.inject(TokenService);
    TestBed.inject(Router);
  });

  it("should be created", () => {
    expect(executeGuard).toBeTruthy();
  });

  it("should allow access when no token found", () => {
    tokenService.clearToken();
    const result = executeGuard(route, state);
    expect(result).toBeTrue();
  });

  it("should redirect when token found", () => {
    tokenService.saveToken("redirect", false);
    const result = executeGuard(route, state);
    expect(result).toBeInstanceOf(UrlTree);
  });
});

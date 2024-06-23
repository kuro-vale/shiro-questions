import {TestBed} from "@angular/core/testing";
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from "@angular/router";

import {tokenGuard} from "./token.guard";
import {TokenService} from "../token.service";

describe("tokenGuard", () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => tokenGuard(...guardParameters));
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    tokenService = TestBed.inject(TokenService);
    TestBed.inject(Router);
  });

  it("should be created", () => {
    expect(executeGuard).toBeTruthy();
  });

  it("should allow access on token found", () => {
    tokenService.saveToken("allow", false);
    const result = executeGuard(route, state);
    expect(result).toBeTrue();
    tokenService.clearToken();
  });

  it("should redirect on empty token", () => {
    tokenService.clearToken();
    const result = executeGuard(route, state);
    expect(result).toBeInstanceOf(UrlTree);
  });
});

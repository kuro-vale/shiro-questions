import {TestBed} from "@angular/core/testing";
import {HttpInterceptorFn, HttpRequest} from "@angular/common/http";

import {tokenInterceptor} from "./token.interceptor";
import {TokenService} from "../token.service";
import {Observable, of} from "rxjs";

describe("tokenInterceptor", () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => tokenInterceptor(req, next));
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    tokenService = TestBed.inject(TokenService);
  });

  it("should be created", () => {
    expect(interceptor).toBeTruthy();
  });

  it("should add token to header", (done) => {
    const token = "intercept";
    tokenService.saveToken(token, false);
    let request = new HttpRequest("GET", "");
    const next: any = (r: HttpRequest<any>): Observable<HttpRequest<any>> => of(r);
    interceptor(request, next).subscribe((intercepted => {
      const newRequest = intercepted as unknown as HttpRequest<any>;
      expect(newRequest.headers.get("Authorization")).toBe(`Bearer ${token}`);
      done();
    }));
    tokenService.clearToken();
  });

  it("should continue request if not token", (done) => {
    tokenService.clearToken();
    let request = new HttpRequest("GET", "");
    const next: any = (r: HttpRequest<any>): Observable<HttpRequest<any>> => of(r);
    interceptor(request, next).subscribe(r => {
      const newRequest = r as unknown as HttpRequest<any>;
      expect(newRequest).toBe(request);
      done();
    });
  });
});

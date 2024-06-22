import {HttpInterceptorFn} from "@angular/common/http";
import {inject} from "@angular/core";
import {TokenService} from "./token.service";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const token = tokenService.token;
  if (!token) {
    return next(req);
  }
  const newRequest = req.clone({
    headers: req.headers.append("Authorization", `Bearer ${token}`)
  });
  return next(newRequest);
};

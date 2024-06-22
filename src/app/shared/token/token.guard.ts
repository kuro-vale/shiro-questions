import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {TokenService} from "./token.service";
import {Paths} from "../constants";

export const tokenGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  return !!tokenService.token || router.createUrlTree([Paths.Login]);
};

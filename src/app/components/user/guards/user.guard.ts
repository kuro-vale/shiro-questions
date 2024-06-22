import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {TokenService} from "../../token/token.service";
import {Paths} from "../../../constants";

export const userGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  return !tokenService.token || router.createUrlTree([Paths.Home]);
};

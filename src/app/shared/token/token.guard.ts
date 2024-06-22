import {CanActivateFn, Router} from "@angular/router";
import {inject, PLATFORM_ID} from "@angular/core";
import {TokenService} from "./token.service";
import {Paths} from "../constants";
import {isPlatformBrowser} from "@angular/common";

export const tokenGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  return !!tokenService.token || !isPlatformBrowser(platformId) || router.createUrlTree([Paths.Login]);
};

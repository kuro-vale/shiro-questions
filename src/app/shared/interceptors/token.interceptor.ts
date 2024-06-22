import {HttpInterceptorFn} from "@angular/common/http";
import {inject} from "@angular/core";
import {UserService} from "../../components/user/user.service";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  const token = userService.getToken();
  if (!token) {
    return next(req);
  }
  const newRequest = req.clone({
    headers: req.headers.append("Authorization", `Bearer ${token}`)
  });
  return next(newRequest);
};

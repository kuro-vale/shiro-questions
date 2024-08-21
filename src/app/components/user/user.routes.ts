import {Routes} from "@angular/router";
import {ProfileRoutes} from "./profile/profile.routes";
import {Paths} from "../../constants";
import {LoginComponent} from "./login/login.component";
import {userGuard} from "./guards/user.guard";
import {RegisterComponent} from "./register/register.component";

export const UserRoutes: Routes = [
  ...ProfileRoutes,
  {
    path: Paths.Login,
    component: LoginComponent,
    title: $localize`:@@login-component_title:Log in | shiro-questions`,
    canActivate: [userGuard]
  },
  {
    path: Paths.Register,
    component: RegisterComponent,
    title: $localize`:@@register-component_title:Register | shiro-questions`,
    canActivate: [userGuard]
  }
];

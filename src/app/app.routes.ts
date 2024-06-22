import {Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {Paths} from "./constants";
import {ProfileComponent} from "./components/user/profile/profile.component";
import {LoginComponent} from "./components/user/login/login.component";
import {RegisterComponent} from "./components/user/register/register.component";
import {tokenGuard} from "./components/token/guards/token.guard";
import {userGuard} from "./components/user/guards/user.guard";

export const routes: Routes = [
  {
    path: Paths.Home,
    component: HomeComponent,
    title: $localize`:@@home-component_title:shiro-questions | Ask with confidence`
  },
  {
    path: Paths.Profile,
    component: ProfileComponent,
    canActivate: [tokenGuard]
  },
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

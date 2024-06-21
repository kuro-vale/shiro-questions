import {Routes} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {Paths} from "./shared/constants";
import {ProfileComponent} from "./pages/profile/profile.component";

export const routes: Routes = [
  {
    path: Paths.Home,
    component: HomeComponent,
    title: $localize`:@@home-component_title:shiro-questions | Ask with confidence`
  },
  {
    path: Paths.Profile,
    component: ProfileComponent,
  }
];

import {Routes} from "@angular/router";
import {HomeComponent} from "./home.component";
import {Paths} from "../../constants";

export const HomeRoutes: Routes = [
  {
    path: Paths.Home,
    component: HomeComponent,
    title: $localize`:@@home-component_title:shiro-questions | Ask with confidence`
  },
];

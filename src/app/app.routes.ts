import {Routes} from "@angular/router";
import {HomeRoutes} from "./components/home/home.routes";
import {UserRoutes} from "./components/user/user.routes";

export const routes: Routes = [
  ...HomeRoutes,
  ...UserRoutes
];

import {Routes} from "@angular/router";
import {Paths} from "../../base/constants";
import {ProfileComponent} from "./profile.component";
import {tokenGuard} from "../../token/guards/token.guard";
import {ProfileInfoComponent} from "./profile-info/profile-info.component";
import {ProfileQuestionsComponent} from "./profile-questions/profile-questions.component";

export const ProfileRoutes: Routes = [
  {
    path: Paths.Profile,
    component: ProfileComponent,
    canActivate: [tokenGuard],
    children: [
      {
        path: "",
        component: ProfileInfoComponent
      },
      {
        path: Paths.Questions,
        component: ProfileQuestionsComponent
      }
    ]
  },
];

import {Routes} from "@angular/router";
import {Paths} from "../../constants";
import {QuestionsComponent} from "./questions/questions.component";

export const QuestionRoutes: Routes = [
  {
    path: Paths.Questions,
    component: QuestionsComponent,
  }
];

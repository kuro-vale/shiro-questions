import {Routes} from "@angular/router";
import {Paths} from "../../constants";
import {QuestionsComponent} from "./questions/questions.component";
import {QuestionDetailsComponent} from "./question-details/question-details.component";

export const QuestionRoutes: Routes = [
  {
    path: Paths.Questions,
    component: QuestionsComponent,
  },
  {
    path: Paths.Questions + "/:id",
    component: QuestionDetailsComponent,
  }
];

import {Component} from "@angular/core";
import {SearchQuestionsComponent} from "../search-questions/search-questions.component";

@Component({
  selector: "app-questions",
  standalone: true,
  imports: [
    SearchQuestionsComponent
  ],
  templateUrl: "./questions.component.html"
})
export class QuestionsComponent {

}

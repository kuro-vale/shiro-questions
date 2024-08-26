import {Component} from "@angular/core";
import {SearchQuestionsComponent} from "../../../question/search-questions/search-questions.component";

@Component({
  selector: "app-profile-questions",
  standalone: true,
  imports: [
    SearchQuestionsComponent
  ],
  templateUrl: "./profile-questions.component.html"
})
export class ProfileQuestionsComponent {
}

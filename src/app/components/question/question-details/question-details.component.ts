import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {map, switchMap} from "rxjs";
import {QuestionService} from "../question.service";
import {QuestionCardComponent} from "../question-card/question-card.component";

@Component({
  selector: "app-question-details",
  standalone: true,
  imports: [
    AsyncPipe,
    QuestionCardComponent
  ],
  templateUrl: "./question-details.component.html"
})
export class QuestionDetailsComponent {
  question$ = this.route.params.pipe(
    map(p => p["id"]),
    switchMap((id: string) => {
      return this.questionService.getQuestion(id);
    })
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly questionService: QuestionService,
  ) {
  }
}

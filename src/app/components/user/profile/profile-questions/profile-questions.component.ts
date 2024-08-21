import {Component} from "@angular/core";
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {QuestionCardComponent} from "../../../question/question-card/question-card.component";
import {map, startWith, switchMap} from "rxjs";
import {QuestionService} from "../../../question/question.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: "app-profile-questions",
  standalone: true,
  imports: [
    AsyncPipe,
    MatFormField,
    MatInput,
    MatLabel,
    MatPaginator,
    MatProgressSpinner,
    NgOptimizedImage,
    QuestionCardComponent
  ],
  templateUrl: "./profile-questions.component.html"
})
export class ProfileQuestionsComponent {
  page = this.route.queryParams.pipe(map(q => parseInt(q["page"] ?? 1)));
  questions$ = this.page.pipe(switchMap(p => {
    return this.questionService.getUserQuestions(p).pipe(startWith(null));
  }));

  constructor(
    private readonly questionService: QuestionService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
  }

  async nextPage(event: PageEvent) {
    await this.router.navigate([], {queryParams: {page: event.pageIndex + 1}});
  }
}

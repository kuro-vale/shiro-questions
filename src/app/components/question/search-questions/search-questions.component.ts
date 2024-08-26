import {Component, Input} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Observable, startWith, switchMap} from "rxjs";
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {QuestionCardComponent} from "../question-card/question-card.component";
import {QuestionService} from "../question.service";
import {PageOf} from "../../../types";
import {Question} from "../question";

@Component({
  selector: "app-search-questions",
  standalone: true,
  imports: [
    AsyncPipe,
    MatPaginator,
    MatProgressSpinner,
    NgOptimizedImage,
    QuestionCardComponent
  ],
  templateUrl: "./search-questions.component.html"
})
export class SearchQuestionsComponent {
  @Input({required: true})
  searchType!: "userQuestions" | "all";
  page = 1;
  questions$ = this.route.queryParams.pipe(switchMap(qp => {
    this.page = parseInt(qp["page"]) || 1;
    const q = qp["q"];
    let key$: Observable<PageOf<Question>>;
    switch (this.searchType) {
      case "all":
        key$ = this.questionService.searchQuestions(this.page, q);
        break;
      case "userQuestions":
        key$ = this.questionService.getUserQuestions(this.page, q);
        break;
    }
    return key$.pipe(startWith(null));
  }));

  constructor(
    private readonly questionService: QuestionService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
  }

  async nextPage(event: PageEvent) {
    await this.router.navigate([], {queryParams: {page: event.pageIndex + 1}, queryParamsHandling: "merge"});
  }
}

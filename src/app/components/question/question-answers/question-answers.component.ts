import {Component, Input, OnInit} from "@angular/core";
import {QuestionService} from "../question.service";
import {AsyncPipe} from "@angular/common";
import {takeUntil} from "rxjs";
import {Answer} from "../../answer/answer";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {AnswerCardComponent} from "../../answer/answer-card/answer-card.component";
import {BaseComponent} from "../../base/base.component";
import {defaultPage} from "../../base/types";
import {Meta} from "@angular/platform-browser";
import {Question} from "../question";
import {MetaConstants} from "../../base/constants";

@Component({
  selector: "app-question-answers",
  standalone: true,
  imports: [
    AsyncPipe,
    MatProgressSpinner,
    AnswerCardComponent
  ],
  templateUrl: "./question-answers.component.html"
})
export class QuestionAnswersComponent extends BaseComponent implements OnInit {
  @Input({required: true})
  question!: Question;
  answers = defaultPage<Answer>();
  page = 1;
  loading = true;

  constructor(
    private readonly questionService: QuestionService,
    private readonly meta: Meta,
  ) {
    super();
  }

  ngOnInit() {
    this.questionService.getAnswers(this.question.id, this.page).pipe(takeUntil(this.destroy$))
      .subscribe(pa => {
        this.answers = pa;
        this.loading = false;
        if (this.question.solved) {
          this.meta.updateTag({
            name: MetaConstants.Description,
            content: this.answers.items[0]?.body ?? $localize`:@@question_detail_desc:We need your help to solve this question!`
          });
        }
      });
  }

  getMoreAnswers() {
    this.loading = true;
    this.questionService.getAnswers(this.question.id, ++this.page).pipe(takeUntil(this.destroy$))
      .subscribe(pa => {
        this.answers.items.push(...pa.items);
        this.loading = false;
      });
  }
}

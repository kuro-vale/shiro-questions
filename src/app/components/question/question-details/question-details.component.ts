import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe, NgTemplateOutlet} from "@angular/common";
import {map, switchMap, takeUntil, tap} from "rxjs";
import {QuestionService} from "../question.service";
import {QuestionCardComponent} from "../question-card/question-card.component";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Icons, MetaConstants} from "../../base/constants";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {StartFocusedDirective} from "../../base/directives/start-focused.directive";
import {Meta, Title} from "@angular/platform-browser";
import {BaseComponent} from "../../base/base.component";
import {QuestionAnswersComponent} from "../question-answers/question-answers.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: "app-question-details",
  standalone: true,
  imports: [
    AsyncPipe,
    QuestionCardComponent,
    MatButton,
    MatIcon,
    NgTemplateOutlet,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatError,
    StartFocusedDirective,
    QuestionAnswersComponent,
    MatProgressSpinner
  ],
  templateUrl: "./question-details.component.html"
})
export class QuestionDetailsComponent extends BaseComponent {
  protected readonly Icons = Icons;
  question$ = this.route.params.pipe(
    map(p => p["id"]),
    switchMap((id: string) => {
      return this.questionService.getQuestion(id);
    }),
    tap(q => {
      this.title.setTitle(`${q?.createdBy}: ${q?.body}`);
      if (!q?.solved) {
        this.meta.updateTag({
          name: MetaConstants.Description,
          content: $localize`:@@question_detail_desc:We need your help to solve this question!`
        });
      }
    })
  );
  showForm = false;
  loading = false;
  answerControl = new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]);
  answerErrorMessages: { [key: string]: string } = {
    required: $localize`:@@error_answer_required:Your answer is required`,
    minlength: $localize`:@@error_answer_minlength:Your answer must be greater than 3 characters long`,
    maxlength: $localize`:@@error_answer_maxlength:Your answer must be less than 1000 characters long`,
  };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly questionService: QuestionService,
    private readonly meta: Meta,
    private readonly title: Title,
  ) {
    super();
  }

  getErrorMessage(control: FormControl, errorMessages: { [key: string]: string }) {
    const key = Object.keys(control.errors!)[0];
    return errorMessages[key];
  }

  submit(id: string) {
    if (!this.showForm) {
      this.showForm = true;
      return;
    }
    if (this.answerControl.invalid) return;
    this.loading = true;
    this.questionService.addAnswer(id, this.answerControl.value!).pipe(takeUntil(this.destroy$)).subscribe(a => {
      this.loading = false;
      if (a) {
        this.answerControl.reset();
        this.showForm = false;
        // TODO
        console.log(a);
      }
    });
  }
}

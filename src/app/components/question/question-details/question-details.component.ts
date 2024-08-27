import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe, NgTemplateOutlet} from "@angular/common";
import {map, switchMap} from "rxjs";
import {QuestionService} from "../question.service";
import {QuestionCardComponent} from "../question-card/question-card.component";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Icons} from "../../../constants";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {StartFocusedDirective} from "../../base/directives/start-focused.directive";

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
    StartFocusedDirective
  ],
  templateUrl: "./question-details.component.html"
})
export class QuestionDetailsComponent {
  protected readonly Icons = Icons;
  question$ = this.route.params.pipe(
    map(p => p["id"]),
    switchMap((id: string) => {
      return this.questionService.getQuestion(id);
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
  ) {
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
    this.questionService.addAnswer(id, this.answerControl.value!).subscribe(a => {
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

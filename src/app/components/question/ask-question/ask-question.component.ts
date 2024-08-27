import {Component, Inject} from "@angular/core";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatOption, MatSelect} from "@angular/material/select";
import {BaseComponent} from "../../base/base.component";
import {CategoryService} from "../../category/category.service";
import {AsyncPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CategoryNamePipe} from "../../category/category-name.pipe";
import {QuestionService} from "../question.service";
import {Question, QuestionRequest} from "../question";
import {takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {Paths} from "../../../constants";

@Component({
  selector: "app-ask-question",
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatDialogContent,
    MatDialogTitle,
    MatSelect,
    MatOption,
    AsyncPipe,
    MatButton,
    MatError,
    ReactiveFormsModule,
    CategoryNamePipe
  ],
  templateUrl: "./ask-question.component.html"
})
export class AskQuestionComponent extends BaseComponent {
  loading = false;
  categories$ = this.categoryService.getAllCategories();
  questionForm = new FormGroup({
    body: new FormControl(this.question?.body ?? "", [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]),
    category: new FormControl(this.question?.category ?? "", [Validators.required])
  });
  bodyErrorMessages: { [key: string]: string } = {
    required: $localize`:@@error_body_required:Your question is required`,
    minlength: $localize`:@@error_body_minlength:Your question must be greater than 3 characters long`,
    maxlength: $localize`:@@error_body_maxlength:Your question must be less than 1000 characters long`,
  };
  categoryErrorMessages: { [key: string]: string } = {
    required: $localize`:@@error_category_required:Category is required`
  };

  constructor(
    private readonly categoryService: CategoryService,
    private readonly questionService: QuestionService,
    private readonly dialogRef: MatDialogRef<AskQuestionComponent>,
    private readonly router: Router,
    @Inject(MAT_DIALOG_DATA) public readonly question?: Question,
  ) {
    super();
  }

  getErrorMessage(control: FormControl, errorMessages: { [key: string]: string }) {
    const key = Object.keys(control.errors!)[0];
    return errorMessages[key];
  }

  onSubmit() {
    if (this.questionForm.invalid || this.loading) return;
    this.loading = true;
    const request = this.questionForm.value as QuestionRequest;
    const key$ = this.question
      ? this.questionService.editQuestion(this.question.id, request)
      : this.questionService.createQuestion(request);

    key$.pipe(takeUntil(this.destroy$))
      .subscribe(async q => {
        this.loading = false;
        if (q) {
          await this.router.navigate([Paths.Questions, q.id]);
          this.dialogRef.close();
        }
      });
  }
}

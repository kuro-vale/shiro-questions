import {Component} from "@angular/core";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatOption, MatSelect} from "@angular/material/select";
import {BaseComponent} from "../../base/base.component";
import {CategoryService} from "../../category/category.service";
import {AsyncPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CategoryNamePipe} from "../../category/category-name.pipe";
import {QuestionService} from "../question.service";
import {QuestionRequest} from "../question";
import {takeUntil} from "rxjs";

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
    body: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]),
    category: new FormControl("", [Validators.required])
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
    private readonly dialogRef: MatDialogRef<AskQuestionComponent>
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
    this.questionService.createQuestion(this.questionForm.value as QuestionRequest).pipe(takeUntil(this.destroy$))
      .subscribe(q => {
        this.loading = false;
        if (q) {
          // TODO redirect to question
          this.dialogRef.close();
        }
      });
  }
}

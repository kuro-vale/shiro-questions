import {AskQuestionComponent} from "./ask-question.component";
import {CategoryService} from "../../category/category.service";
import {QuestionService} from "../question.service";
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {of} from "rxjs";

describe("AskQuestionComponent", () => {
  let component: AskQuestionComponent;
  let categoryService: CategoryService;
  let questionService: jasmine.SpyObj<QuestionService>;
  let dialogRef: MatDialogRef<AskQuestionComponent>;
  let router: Router;
  let question = {id: "test", body: "test", solved: false, category: "", createdAt: "", createdBy: ""};

  beforeEach(async () => {
    categoryService = jasmine.createSpyObj<CategoryService>(["getAllCategories"]);
    questionService = jasmine.createSpyObj<QuestionService>(["editQuestion", "createQuestion"]);
    dialogRef = jasmine.createSpyObj<MatDialogRef<AskQuestionComponent>>(["close"]);
    router = jasmine.createSpyObj<Router>(["navigate"]);
    component = new AskQuestionComponent(categoryService, questionService, dialogRef, router, question);
    component.questionForm.patchValue({body: "test", category: "test"});
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should get error message", () => {
    component.questionForm.reset();
    const result = component.getErrorMessage(component.questionForm.controls.body, component.bodyErrorMessages);
    expect(result).toBe("Your question is required");
  });

  it("should not submit on invalid form", () => {
    component.questionForm.reset();
    component.onSubmit();
    expect(questionService.editQuestion).toHaveBeenCalledTimes(0);
    expect(questionService.createQuestion).toHaveBeenCalledTimes(0);
  });

  it("should not submit on loading", () => {
    component.loading = true;
    component.onSubmit();
    expect(questionService.editQuestion).toHaveBeenCalledTimes(0);
    expect(questionService.createQuestion).toHaveBeenCalledTimes(0);
    component.loading = false;
  });

  it("should edit question", () => {
    questionService.editQuestion.and.returnValue(of(question!));
    component.onSubmit();
    expect(questionService.editQuestion).toHaveBeenCalled();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it("should create question", () => {
    component = new AskQuestionComponent(categoryService, questionService, dialogRef, router);
    component.questionForm.patchValue({body: "test", category: "test"});
    questionService.createQuestion.and.returnValue(of(question));
    component.onSubmit();
    expect(questionService.createQuestion).toHaveBeenCalled();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});

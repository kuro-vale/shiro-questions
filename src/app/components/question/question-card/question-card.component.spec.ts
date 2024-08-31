import {QuestionCardComponent} from "./question-card.component";
import {UserService} from "../../user/user.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {QuestionService} from "../question.service";
import {of} from "rxjs";
import {DeleteQuestionComponent} from "../delete-question/delete-question.component";

describe("QuestionCardComponent", () => {
  let component: QuestionCardComponent;
  let userService: UserService;
  let dialog: jasmine.SpyObj<MatDialog>;
  let questionService: jasmine.SpyObj<QuestionService>;
  let question = {
    id: "test",
    body: "",
    createdBy: "",
    createdAt: "",
    category: "",
    solved: false
  };

  beforeEach(async () => {
    userService = jasmine.createSpyObj<UserService>(["currentUser"]);
    const openDialog = jasmine.createSpyObj<MatDialogRef<DeleteQuestionComponent>>(["afterClosed"]);
    openDialog.afterClosed.and.returnValue(of(true));
    dialog = jasmine.createSpyObj<MatDialog>(["open"]);
    dialog.open.and.returnValue(openDialog);
    questionService = jasmine.createSpyObj<QuestionService>(["solveQuestion", "deleteQuestion"]);
    component = new QuestionCardComponent(userService, dialog, questionService);
    component.question = question;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should open question dialog", () => {
    component.editQuestion();
    expect(dialog.open).toHaveBeenCalled();
  });

  it("should mark a question as solved", () => {
    questionService.solveQuestion.and.returnValue(of(question));
    component.markAsSolved();
    expect(component.question.solved).toBeTrue();
  });

  it("should revert mark on error", () => {
    questionService.solveQuestion.and.returnValue(of(null));
    component.markAsSolved();
    expect(component.question.solved).toBeFalse();
  });

  it("should delete question", () => {
    questionService.deleteQuestion.and.returnValue(of(null));
    component.deleteQuestion();
    expect(component.animateDeleteState).toBe("out");
  });

  it("should revert animation state on failure", () => {
    questionService.deleteQuestion.and.returnValue(of(false));
    component.deleteQuestion();
    expect(component.animateDeleteState).toBe("in");
  });
});

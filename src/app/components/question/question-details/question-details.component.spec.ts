import {QuestionDetailsComponent} from "./question-details.component";
import {ActivatedRoute} from "@angular/router";
import {QuestionService} from "../question.service";
import {Meta, Title} from "@angular/platform-browser";
import {of} from "rxjs";
import {QuestionAnswersComponent} from "../question-answers/question-answers.component";
import {UserService} from "../../user/user.service";

describe("QuestionDetailsComponent", () => {
  let component: QuestionDetailsComponent;
  let route: ActivatedRoute;
  let questionService: jasmine.SpyObj<QuestionService>;
  let meta: Meta;
  let title: Title;
  let userService: UserService;

  beforeEach(async () => {
    route = jasmine.createSpyObj<ActivatedRoute>([], {
      params: of({id: "123"})
    });
    questionService = jasmine.createSpyObj<QuestionService>(["addAnswer", "getQuestion"]);
    meta = jasmine.createSpyObj<Meta>(["updateTag"]);
    title = jasmine.createSpyObj<Title>(["setTitle"]);
    userService = jasmine.createSpyObj<UserService>(["currentUser"]);
    component = new QuestionDetailsComponent(route, questionService, meta, title, userService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should get the question", (done) => {
    const expected = {id: "123", solved: false, body: "", category: "", createdAt: "", createdBy: ""};
    questionService.getQuestion.and.returnValue(of(expected));
    component.question$.subscribe(q => {
      expect(q).toEqual(expected);
      done();
    });
  });

  it("should get the error message", () => {
    component.answerControl.reset();
    const result = component.getErrorMessage(component.answerControl, component.answerErrorMessages);
    expect(result).toBe("Your answer is required");
  });

  it("should show the form", () => {
    component.submit("123");
    expect(component.showForm).toBeTrue();
    expect(questionService.addAnswer).toHaveBeenCalledTimes(0);
  });

  it("should return on invalid form", () => {
    component.showForm = true;
    component.answerControl.reset();
    component.submit("123");
    expect(questionService.addAnswer).toHaveBeenCalledTimes(0);
  });

  it("should submit the answer", () => {
    component.showForm = true;
    component.answerControl.setValue("testing");
    component.questionAnswersRef = jasmine.createSpyObj<QuestionAnswersComponent>(["addAnswer"]);
    const expected = {id: "1", body: "", updatedAt: "", createdAt: "", createdBy: "", upvotes: 0, downvotes: 0};
    questionService.addAnswer.and.returnValue(of(expected));
    component.submit("123");
    expect(component.questionAnswersRef.addAnswer).toHaveBeenCalledWith(expected);
  });
});

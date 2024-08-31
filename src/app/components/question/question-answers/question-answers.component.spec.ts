import {QuestionAnswersComponent} from "./question-answers.component";
import {QuestionService} from "../question.service";
import {Meta} from "@angular/platform-browser";

describe("QuestionAnswersComponent", () => {
  let component: QuestionAnswersComponent;
  let questionService: QuestionService;
  let meta: Meta;

  beforeEach(async () => {
    questionService = jasmine.createSpyObj<QuestionService>(["getAnswers"]);
    meta = jasmine.createSpyObj<Meta>(["updateTag"]);
    component = new QuestionAnswersComponent(questionService, meta);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

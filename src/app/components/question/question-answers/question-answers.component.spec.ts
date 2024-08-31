import {QuestionAnswersComponent} from "./question-answers.component";
import {QuestionService} from "../question.service";
import {Meta} from "@angular/platform-browser";
import {of} from "rxjs";
import {Answer} from "../../answer/answer";
import {MetaConstants} from "../../base/constants";

describe("QuestionAnswersComponent", () => {
  let component: QuestionAnswersComponent;
  let questionService: jasmine.SpyObj<QuestionService>;
  let meta: Meta;
  let answer: Answer = {id: "123", body: "", createdBy: "", createdAt: "", downvotes: 0, upvotes: 0, updatedAt: ""};

  beforeEach(async () => {
    questionService = jasmine.createSpyObj<QuestionService>(["getAnswers"]);
    meta = jasmine.createSpyObj<Meta>(["updateTag"]);
    component = new QuestionAnswersComponent(questionService, meta);
    component.question = {id: "123", solved: true, category: "", createdAt: "", createdBy: "", body: ""};
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should get the question answers", () => {
    const expected = {items: [answer], metadata: {per: 1, total: 1}};
    questionService.getAnswers.and.returnValue(of(expected));
    component.ngOnInit();
    expect(component.answers).toEqual(expected);
  });

  it("should set default meta on empty answers", () => {
    const expected = {items: [], metadata: {per: 0, total: 0}};
    questionService.getAnswers.and.returnValue(of(expected));
    component.ngOnInit();
    expect(meta.updateTag).toHaveBeenCalledWith({
      name: MetaConstants.Description,
      content: "We need your help to solve this question!"
    });
  });

  it("should get more answers", () => {
    const initialAnswers = component.answers.items.length;
    const expected = {items: [answer], metadata: {per: 1, total: 1}};
    questionService.getAnswers.and.returnValue(of(expected));
    component.getMoreAnswers();
    expect(component.answers.items.length).not.toBe(initialAnswers);
  });

  it("should add created answer", () => {
    component.addAnswer(answer);
    expect(component.answers.items).toContain(answer);
  });
});

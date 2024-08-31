import {QuestionDetailsComponent} from "./question-details.component";
import {ActivatedRoute} from "@angular/router";
import {QuestionService} from "../question.service";
import {Meta, Title} from "@angular/platform-browser";
import {of} from "rxjs";

describe("QuestionDetailsComponent", () => {
  let component: QuestionDetailsComponent;
  let route: ActivatedRoute;
  let questionService: QuestionService;
  let meta: Meta;
  let title: Title;

  beforeEach(async () => {
    route = jasmine.createSpyObj<ActivatedRoute>([], {
      params: of({"id": "123"})
    });
    questionService = jasmine.createSpyObj<QuestionService>(["addAnswer"]);
    meta = jasmine.createSpyObj<Meta>(["updateTag"]);
    title = jasmine.createSpyObj<Title>(["setTitle"]);
    component = new QuestionDetailsComponent(route, questionService, meta, title);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

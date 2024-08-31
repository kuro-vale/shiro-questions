import {TestBed} from "@angular/core/testing";

import {SearchQuestionsComponent} from "./search-questions.component";
import {QuestionService} from "../question.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../category/category.service";
import {of} from "rxjs";

describe("SearchQuestionsComponent", () => {
  let component: SearchQuestionsComponent;
  let questionService: QuestionService;
  let route: ActivatedRoute;
  let router: Router;
  let categoryService: CategoryService;

  beforeEach(async () => {
    questionService = jasmine.createSpyObj<QuestionService>(["searchQuestions"]);
    route = jasmine.createSpyObj<ActivatedRoute>([], {
      queryParams: of({})
    });
    router = TestBed.inject(Router);
    categoryService = jasmine.createSpyObj<CategoryService>(["getAllCategoryOptions"]);
    component = new SearchQuestionsComponent(questionService, route, router, categoryService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

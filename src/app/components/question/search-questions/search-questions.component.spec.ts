import {SearchQuestionsComponent} from "./search-questions.component";
import {QuestionService} from "../question.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../category/category.service";
import {of} from "rxjs";
import {Question} from "../question";
import {ElementRef} from "@angular/core";

describe("SearchQuestionsComponent", () => {
  let component: SearchQuestionsComponent;
  let questionService: jasmine.SpyObj<QuestionService>;
  let route: ActivatedRoute;
  let router: Router;
  let categoryService: CategoryService;
  let question: Question = {id: "123", category: "", body: "", createdBy: "", createdAt: "", solved: true};
  let questionPage = {items: [question], metadata: {per: 1, total: 1}};

  beforeEach(async () => {
    questionService = jasmine.createSpyObj<QuestionService>(["searchQuestions", "getUserQuestions"]);
    route = jasmine.createSpyObj<ActivatedRoute>([], {
      queryParams: of({page: 1, q: "test", category: "All"})
    });
    router = jasmine.createSpyObj<Router>(["navigate"]);
    categoryService = jasmine.createSpyObj<CategoryService>(["getAllCategoryOptions"]);
    component = new SearchQuestionsComponent(questionService, route, router, categoryService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should get the questions", (done) => {
    component.searchType = "all";
    questionService.searchQuestions.and.returnValue(of(questionPage));
    component.questions$.subscribe({
      next: q => {
        if (q) {
          expect(q).toEqual(questionPage);
          done();
        } else {
          expect(q).toBeNull();
        }
      }, error: () => done.fail
    });
  });

  it("should get the questions with empty params", (done) => {
    route = jasmine.createSpyObj<ActivatedRoute>([], {
      queryParams: of({})
    });
    component = new SearchQuestionsComponent(questionService, route, router, categoryService);
    component.searchType = "all";
    questionService.searchQuestions.and.returnValue(of(questionPage));
    component.questions$.subscribe({
      next: q => {
        expect(component.page).toBe(1);
        if (q) {
          expect(q).toEqual(questionPage);
          done();
        } else {
          expect(q).toBeNull();
        }
      }, error: () => done.fail
    });
  });

  it("should get the user questions", (done) => {
    component.searchType = "userQuestions";
    questionService.getUserQuestions.and.returnValue(of(questionPage));
    component.questions$.subscribe({
      next: q => {
        if (q) {
          expect(q).toEqual(questionPage);
          done();
        } else {
          expect(q).toBeNull();
        }
      }, error: () => done.fail
    });
  });

  it("should search by category", () => {
    component.ngOnInit();
    component.categoryControl.setValue("All");
    expect(router.navigate).toHaveBeenCalled();
  });

  it("should get next page", () => {
    component.nextPage({pageIndex: 1, previousPageIndex: 0, pageSize: 1, length: 1});
    expect(router.navigate).toHaveBeenCalled();
  });

  it("should scroll categoryButtons", () => {
    const element = jasmine.createSpyObj<HTMLElement>(["scrollBy"]);
    component.categoryButtons = jasmine.createSpyObj<ElementRef>([], {
      nativeElement: element
    });
    component.scrollLeft();
    component.scrollRight();
    expect(element.scrollBy).toHaveBeenCalledTimes(2);
  });
});

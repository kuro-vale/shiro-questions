import {TestBed} from "@angular/core/testing";

import {QuestionService} from "./question.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ErrorService} from "../base/error/error.service";
import {of, throwError} from "rxjs";
import {defaultPage} from "../base/types";
import {Question} from "./question";
import {Answer} from "../answer/answer";

describe("QuestionService", () => {
  let service: QuestionService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let errorServiceSpy: jasmine.SpyObj<ErrorService>;
  let question = {id: "123", category: "", body: "", createdBy: "", createdAt: "", solved: true};
  let questionPage = {items: [question], metadata: {per: 1, total: 1}};
  let answer = {id: "123", body: "", createdBy: "", createdAt: "", downvotes: 0, upvotes: 0, updatedAt: ""};

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj<HttpClient>(["get", "post", "put", "patch", "delete"]);
    errorServiceSpy = jasmine.createSpyObj(ErrorService, ["showError"]);
    TestBed.configureTestingModule({
      providers: [
        QuestionService, {provide: HttpClient, useValue: httpClientSpy},
        {provide: ErrorService, useValue: errorServiceSpy}
      ]
    });
    service = TestBed.inject(QuestionService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("#getUserQuestions should return questions", (done) => {
    httpClientSpy.get.and.returnValue(of(questionPage));
    service.getUserQuestions().subscribe(r => {
      expect(r).toEqual(questionPage);
      done();
    });
  });

  it("#getUserQuestions should empty page on error", (done) => {
    httpClientSpy.get.and.callFake(() => {
      return throwError(() => new HttpErrorResponse({error: "Server error", status: 500}));
    });
    service.getUserQuestions().subscribe(r => {
      expect(r).toEqual(defaultPage<Question>());
      done();
    });
  });

  it("#searchQuestions should return questions", (done) => {
    httpClientSpy.get.and.returnValue(of(questionPage));
    service.searchQuestions().subscribe(r => {
      expect(r).toEqual(questionPage);
      done();
    });
  });

  it("#searchQuestions should empty page on error", (done) => {
    httpClientSpy.get.and.callFake(() => {
      return throwError(() => new HttpErrorResponse({error: "Server error", status: 500}));
    });
    service.searchQuestions().subscribe(r => {
      expect(r).toEqual(defaultPage<Question>());
      done();
    });
  });

  it("#getQuestion should return question", (done) => {
    httpClientSpy.get.and.returnValue(of(question));
    service.getQuestion("").subscribe(r => {
      expect(r).toEqual(question);
      done();
    });
  });

  it("#getQuestion should null on error", (done) => {
    httpClientSpy.get.and.callFake(() => {
      return throwError(() => new HttpErrorResponse({error: "Server error", status: 500}));
    });
    service.getQuestion("").subscribe(r => {
      expect(r).toEqual(null);
      done();
    });
  });

  it("#createQuestion should return question", (done) => {
    httpClientSpy.post.and.returnValue(of(question));
    service.createQuestion({body: "", category: ""}).subscribe(r => {
      expect(r).toEqual(question);
      done();
    });
  });

  it("#createQuestion should null on error", (done) => {
    httpClientSpy.post.and.callFake(() => {
      return throwError(() => new HttpErrorResponse({error: "Server error", status: 500}));
    });
    service.createQuestion({body: "", category: ""}).subscribe(r => {
      expect(r).toEqual(null);
      done();
    });
  });

  it("#editQuestion should return question", (done) => {
    httpClientSpy.put.and.returnValue(of(question));
    service.editQuestion("", {body: "", category: ""}).subscribe(r => {
      expect(r).toEqual(question);
      done();
    });
  });

  it("#editQuestion should null on error", (done) => {
    httpClientSpy.put.and.callFake(() => {
      return throwError(() => new HttpErrorResponse({error: "Server error", status: 500}));
    });
    service.editQuestion("", {body: "", category: ""}).subscribe(r => {
      expect(r).toEqual(null);
      done();
    });
  });

  it("#solveQuestion should return question", (done) => {
    httpClientSpy.patch.and.returnValue(of(question));
    service.solveQuestion("").subscribe(r => {
      expect(r).toEqual(question);
      done();
    });
  });

  it("#solveQuestion should null on error", (done) => {
    httpClientSpy.patch.and.callFake(() => {
      return throwError(() => new HttpErrorResponse({error: "Server error", status: 500}));
    });
    service.solveQuestion("").subscribe(r => {
      expect(r).toEqual(null);
      done();
    });
  });

  it("#deleteQuestion should return null", (done) => {
    httpClientSpy.delete.and.returnValue(of(null));
    service.deleteQuestion("").subscribe(r => {
      expect(r).toEqual(null);
      done();
    });
  });

  it("#deleteQuestion should return false on error", (done) => {
    httpClientSpy.delete.and.callFake(() => {
      return throwError(() => new HttpErrorResponse({error: "Server error", status: 500}));
    });
    service.deleteQuestion("").subscribe(r => {
      expect(r).toEqual(false);
      done();
    });
  });

  it("#addAnswer should return the answer", (done) => {
    httpClientSpy.post.and.returnValue(of(answer));
    service.addAnswer("", "").subscribe(r => {
      expect(r).toEqual(answer);
      done();
    });
  });

  it("#addAnswer should return null on error", (done) => {
    httpClientSpy.post.and.callFake(() => {
      return throwError(() => new HttpErrorResponse({error: "Server error", status: 500}));
    });
    service.addAnswer("", "").subscribe(r => {
      expect(r).toEqual(null);
      done();
    });
  });

  it("#getAnswers should return answers", (done) => {
    const expected = {items: [answer], metadata: {per: 1, total: 1}};
    httpClientSpy.get.and.returnValue(of(expected));
    service.getAnswers("", 1).subscribe(r => {
      expect(r).toEqual(expected);
      done();
    });
  });

  it("#getAnswers should return empty page on error", (done) => {
    httpClientSpy.get.and.callFake(() => {
      return throwError(() => new HttpErrorResponse({error: "Server error", status: 500}));
    });
    service.getAnswers("", 1).subscribe(r => {
      expect(r).toEqual(defaultPage<Answer>());
      done();
    });
  });

  it("#searchQuestions should return questions with query", (done) => {
    httpClientSpy.get.and.returnValue(of(questionPage));
    service.searchQuestions(2, "test", "test").subscribe(r => {
      expect(r).toEqual(questionPage);
      done();
    });
  });
});

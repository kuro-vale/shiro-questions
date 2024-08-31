import {TestBed} from "@angular/core/testing";

import {QuestionService} from "./question.service";
import {HttpClient} from "@angular/common/http";
import {ErrorService} from "../base/error/error.service";

describe("QuestionService", () => {
  let service: QuestionService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let errorServiceSpy: jasmine.SpyObj<ErrorService>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj(HttpClient, ["get"]);
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
});

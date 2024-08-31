import {TestBed} from "@angular/core/testing";

import {AnswerService} from "./answer.service";
import {HttpClient} from "@angular/common/http";
import {ErrorService} from "../base/error/error.service";

describe("AnswerService", () => {
  let service: AnswerService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let errorServiceSpy: jasmine.SpyObj<ErrorService>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj(HttpClient, ["get"]);
    errorServiceSpy = jasmine.createSpyObj(ErrorService, ["showError"]);
    TestBed.configureTestingModule({
      providers: [
        AnswerService, {provide: HttpClient, useValue: httpClientSpy},
        {provide: ErrorService, useValue: errorServiceSpy}
      ]
    });
    service = TestBed.inject(AnswerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});

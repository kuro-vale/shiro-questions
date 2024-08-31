import {TestBed} from "@angular/core/testing";

import {AnswerService} from "./answer.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ErrorService} from "../base/error/error.service";
import {of, throwError} from "rxjs";

describe("AnswerService", () => {
  let service: AnswerService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let errorServiceSpy: jasmine.SpyObj<ErrorService>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj<HttpClient>(["post", "delete", "put"]);
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

  it("#addUpvote should return null", (done) => {
    httpClientSpy.post.and.returnValue(of(null));
    service.addUpvote("").subscribe(r => {
      expect(r).toBe(null);
      done();
    });
  });

  it("#addUpvote should return false on error", (done) => {
    httpClientSpy.post.and.callFake(() => {
      return throwError(() => new HttpErrorResponse({error: "Server error", status: 500}));
    });
    service.addUpvote("").subscribe(r => {
      expect(r).toBe(false);
      done();
    });
  });

  it("#addDownVote should return null", (done) => {
    httpClientSpy.post.and.returnValue(of(null));
    service.addDownVote("").subscribe(r => {
      expect(r).toBe(null);
      done();
    });
  });

  it("#addDownVote should return false on error", (done) => {
    httpClientSpy.post.and.callFake(() => {
      return throwError(() => new HttpErrorResponse({error: "Server error", status: 500}));
    });
    service.addDownVote("").subscribe(r => {
      expect(r).toBe(false);
      done();
    });
  });

  it("#deleteAnswer should return null", (done) => {
    httpClientSpy.delete.and.returnValue(of(null));
    service.deleteAnswer("").subscribe(r => {
      expect(r).toBe(null);
      done();
    });
  });

  it("#deleteAnswer should return false on error", (done) => {
    httpClientSpy.delete.and.callFake(() => {
      return throwError(() => new HttpErrorResponse({error: "Server error", status: 500}));
    });
    service.deleteAnswer("").subscribe(r => {
      expect(r).toBe(false);
      done();
    });
  });

  it("#editAnswer should return the answer", (done) => {
    const expected = {id: "123", body: "", createdBy: "", createdAt: "", downvotes: 0, upvotes: 0, updatedAt: ""};
    httpClientSpy.put.and.returnValue(of(expected));
    service.editAnswer("", "").subscribe(r => {
      expect(r).toBe(expected);
      done();
    });
  });

  it("#editAnswer should return null on error", (done) => {
    httpClientSpy.put.and.callFake(() => {
      return throwError(() => new HttpErrorResponse({error: "Server error", status: 500}));
    });
    service.editAnswer("", "").subscribe(r => {
      expect(r).toBe(null);
      done();
    });
  });
});

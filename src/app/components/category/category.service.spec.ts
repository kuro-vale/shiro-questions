import {CategoryService} from "./category.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Category} from "./category";
import {MatSnackBar} from "@angular/material/snack-bar";
import {of, throwError} from "rxjs";
import {TestBed} from "@angular/core/testing";
import {Router} from "@angular/router";

describe("CategoryService", () => {
  let service: CategoryService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);
    snackBarSpy = jasmine.createSpyObj("MatSnackBar", ["open"]);
    const router = TestBed.inject(Router);
    service = new CategoryService(httpClientSpy, snackBarSpy, router);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("#getAllCategories should return categories", (done) => {
    const expectedCats: Category[] = [{name: "Tech"}, {name: "Test"}];
    httpClientSpy.get.and.returnValue(of(expectedCats));
    service.getAllCategories().subscribe({
      next: categories => {
        expect(categories).toEqual(expectedCats);
        done();
      }, error: () => done.fail
    });
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  it("#getAllCategories should return an empty list on error", (done) => {
    httpClientSpy.get.and.callFake(() => {
      return throwError(() => new HttpErrorResponse({error: "Server error", status: 500}));
    });
    service.getAllCategories().subscribe({
      next: categories => {
        expect(snackBarSpy.open.calls.count()).toBe(1);
        expect(categories).toEqual([]);
        done();
      }, error: () => done.fail
    });
  });
});

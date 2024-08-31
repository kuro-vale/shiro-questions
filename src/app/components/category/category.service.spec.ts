import {CategoryService} from "./category.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Category} from "./category";
import {MatSnackBar} from "@angular/material/snack-bar";
import {of, throwError} from "rxjs";
import {TestBed} from "@angular/core/testing";
import {CategoriesIcons, CategoriesTranslations} from "../base/constants";

describe("CategoryService", () => {
  let service: CategoryService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj(HttpClient, ["get"]);
    snackBarSpy = jasmine.createSpyObj(MatSnackBar, ["open"]);
    TestBed.configureTestingModule({
      providers: [
        CategoryService, {provide: HttpClient, useValue: httpClientSpy},
        {provide: MatSnackBar, useValue: snackBarSpy}
      ]
    });
    service = TestBed.inject(CategoryService);
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

  it("#getAllCategoryOptions should map categories", (done) => {
    const categories: Category[] = [{name: "Food"}, {name: "Music"}, {name: "Hentai"}];
    httpClientSpy.get.and.returnValue(of(categories));
    const expectedCategories = [
      {label: CategoriesTranslations.All, icon: CategoriesIcons.All, value: "All"},
      {label: CategoriesTranslations.Food, icon: CategoriesIcons.Food, value: "Food"},
      {label: CategoriesTranslations.Music, icon: CategoriesIcons.Music, value: "Music"}
    ];
    service.getAllCategoryOptions().subscribe({
      next: categories => {
        expect(categories).toEqual(expectedCategories);
        done();
      }, error: () => done.fail
    });
  });

  it("#getAllCategories should return cached categories", (done) => {
    const expectedCats: Category[] = [{name: "Tech"}, {name: "Test"}];
    httpClientSpy.get.and.returnValue(of(expectedCats));
    service.getAllCategories().subscribe({
      next: _ => {
        // call a second time
        service.getAllCategories().subscribe({
          next: categories => {
            expect(categories).toEqual(expectedCats);
            expect(httpClientSpy.get.calls.count()).toBe(1);
            done();
          }, error: () => done.fail
        });
      }, error: () => done.fail
    });
  });
});

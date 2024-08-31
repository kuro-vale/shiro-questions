import {HomeComponent} from "./home.component";
import {CategoryService} from "../category/category.service";
import {Meta} from "@angular/platform-browser";
import {UserService} from "../user/user.service";
import {TestBed} from "@angular/core/testing";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {signal} from "@angular/core";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let meta: jasmine.SpyObj<Meta>;
  let router: Router;
  let userService: UserService;
  let dialog: MatDialog;

  beforeEach(async () => {
    const categoryServiceSpy = jasmine.createSpyObj<CategoryService>(["getAllCategoryOptions"]);
    userService = jasmine.createSpyObj<UserService>([], {
      currentUser: signal(null)
    });
    router = TestBed.inject(Router);
    dialog = jasmine.createSpyObj<MatDialog>(["open"]);
    meta = jasmine.createSpyObj<Meta>(["updateTag"]);
    component = new HomeComponent(categoryServiceSpy, meta, userService, router, dialog);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should create meta tag", () => {
    component.ngOnInit();
    expect(meta.updateTag).toHaveBeenCalled();
  });

  it("should redirect to register page if no logged user", () => {
    const navigateSpy = spyOn(router, "navigate");
    component.openAskQuestionDialog();
    expect(navigateSpy).toHaveBeenCalled();
  });

  it("should open ask question dialog", () => {
    userService.currentUser.set({username: "test"});
    component.openAskQuestionDialog();
    expect(dialog.open).toHaveBeenCalled();
  });

  it("should search question by category", () => {
    const navigateSpy = spyOn(router, "navigate");
    component.searchCategory("All");
    expect(navigateSpy).toHaveBeenCalled();
  });
});

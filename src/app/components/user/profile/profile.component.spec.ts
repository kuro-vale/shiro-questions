import {ProfileComponent} from "./profile.component";
import {UserService} from "../user.service";
import {Meta, Title} from "@angular/platform-browser";
import {EventType, NavigationEnd, Router} from "@angular/router";
import {TestBed} from "@angular/core/testing";
import {of} from "rxjs";

describe("ProfileComponent", () => {
  let component: ProfileComponent;
  let userService: UserService;
  let title: Title;
  let meta: Meta;
  let router: Router;

  beforeEach(async () => {
    userService = jasmine.createSpyObj<UserService>(["currentUser"]);
    title = jasmine.createSpyObj<Title>(["setTitle"]);
    meta = jasmine.createSpyObj<Meta>(["updateTag"]);
    router = jasmine.createSpyObj<Router>([], {
      get events() {
        const ne: NavigationEnd = {
          url: "", type: EventType.NavigationEnd, id: 1, urlAfterRedirects: ""
        };
        return of(ne);
      }
    });
    TestBed.runInInjectionContext(() => {
      component = new ProfileComponent(userService, title, meta, router);
    });
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should create meta on profile route", () => {
    component.ngOnInit();
    expect(meta.updateTag).toHaveBeenCalled();
  });
});

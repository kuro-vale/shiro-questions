import {ComponentFixture, TestBed} from "@angular/core/testing";
import {NavbarComponent} from "./navbar.component";
import {provideRouter, Router} from "@angular/router";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {provideHttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {Paths} from "../base/constants";
import {UserService} from "../user/user.service";

describe("NavbarComponent", () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let compiled: HTMLElement;
  let dialog: MatDialog;
  let router: Router;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([]), provideHttpClient()]
    }).compileComponents();

    const mockSvgContent = "<svg><rect width=\"100\" height=\"100\" style=\"fill:blue;\" /></svg>";
    const iconService = TestBed.inject(MatIconRegistry);
    const sanitizer = TestBed.inject(DomSanitizer);
    userService = TestBed.inject(UserService);
    dialog = TestBed.inject(MatDialog);
    router = TestBed.inject(Router);
    iconService.addSvgIconLiteral("app-logo", sanitizer.bypassSecurityTrustHtml(mockSvgContent));
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should create navbar", () => {
    expect(component).toBeTruthy();
  });

  it("should render nav items", () => {
    const items = compiled.querySelectorAll("li");
    expect(items.length).toBe(3);
  });

  it("should open register dialog", () => {
    component.openRegisterDialog();
    expect(dialog.openDialogs.length).toBe(1);
  });

  it("should redirect to register page", () => {
    spyOnProperty(router, "url").and.returnValue(Paths.Login);
    const navigateSpy = spyOn(router, "navigate");
    component.openRegisterDialog();
    expect(navigateSpy).toHaveBeenCalled();
  });

  it("should open login dialog", () => {
    component.openLoginDialog();
    expect(dialog.openDialogs.length).toBe(1);
  });

  it("should redirect to login page", () => {
    spyOnProperty(router, "url").and.returnValue(Paths.Register);
    const navigateSpy = spyOn(router, "navigate");
    component.openLoginDialog();
    expect(navigateSpy).toHaveBeenCalled();
  });

  it("should redirect to register page if no logged user", () => {
    const navigateSpy = spyOn(router, "navigate");
    component.openAskQuestionDialog();
    expect(navigateSpy).toHaveBeenCalled();
  });

  it("should open ask question dialog", () => {
    userService.currentUser.set({username: "test"});
    component.openAskQuestionDialog();
    expect(dialog.openDialogs.length).toBe(1);
  });

  it("should logout user", () => {
    const navigateSpy = spyOn(router, "navigate");
    component.logout();
    expect(navigateSpy).toHaveBeenCalled();
  });

  it("should search question on any route", () => {
    const navigateSpy = spyOn(router, "navigate");
    spyOnProperty(router, "url").and.returnValue(Paths.Home);
    component.search();
    expect(navigateSpy).toHaveBeenCalled();
  });

  it("should search question on profile route", () => {
    const navigateSpy = spyOn(router, "navigate");
    spyOnProperty(router, "url").and.returnValue(`${Paths.Profile}/${Paths.Questions}`);
    component.search();
    expect(navigateSpy).toHaveBeenCalled();
  });
});

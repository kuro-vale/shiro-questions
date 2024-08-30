import {ComponentFixture, TestBed} from "@angular/core/testing";
import {NavbarComponent} from "./navbar.component";
import {provideRouter, Router} from "@angular/router";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {provideHttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {Paths} from "../base/constants";

describe("NavbarComponent", () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let compiled: HTMLElement;
  let dialog: MatDialog;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([]), provideHttpClient()]
    }).compileComponents();

    const mockSvgContent = "<svg><rect width=\"100\" height=\"100\" style=\"fill:blue;\" /></svg>";
    const iconService = TestBed.inject(MatIconRegistry);
    const sanitizer = TestBed.inject(DomSanitizer);
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
    expect(items.length).toBe(6);
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
});

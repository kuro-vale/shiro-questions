import {ComponentFixture, TestBed} from "@angular/core/testing";
import {NavbarComponent} from "./navbar.component";
import {provideRouter} from "@angular/router";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {provideHttpClient} from "@angular/common/http";

describe("NavbarComponent", () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([]), provideHttpClient()]
    }).compileComponents();

    const mockSvgContent = "<svg><rect width=\"100\" height=\"100\" style=\"fill:blue;\" /></svg>";
    const iconService = TestBed.inject(MatIconRegistry);
    const sanitizer = TestBed.inject(DomSanitizer);
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
});

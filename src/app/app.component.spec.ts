import {ComponentFixture, TestBed} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {provideRouter} from "@angular/router";
import {provideHttpClient} from "@angular/common/http";

describe("AppComponent", () => {
  let component: AppComponent;
  let compiled: HTMLElement;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([]), provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should create the app", () => {
    expect(component).toBeTruthy();
  });

  it("should render navbar", () => {
    expect(compiled.querySelector("app-navbar")).toBeTruthy();
  });

  it("should render footer", () => {
    expect(compiled.querySelector("app-footer")).toBeTruthy();
  });
});

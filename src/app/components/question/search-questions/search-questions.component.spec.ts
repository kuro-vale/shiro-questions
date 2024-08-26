import {ComponentFixture, TestBed} from "@angular/core/testing";

import {SearchQuestionsComponent} from "./search-questions.component";

describe("SearchQuestionsComponent", () => {
  let component: SearchQuestionsComponent;
  let fixture: ComponentFixture<SearchQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchQuestionsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

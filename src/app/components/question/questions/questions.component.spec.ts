import {QuestionsComponent} from "./questions.component";
import {ActivatedRoute} from "@angular/router";
import {Meta, Title} from "@angular/platform-browser";
import {of} from "rxjs";

describe("QuestionsComponent", () => {
  let component: QuestionsComponent;
  let route: ActivatedRoute;
  let title: Title;
  let meta: Meta;

  beforeEach(async () => {
    route = jasmine.createSpyObj<ActivatedRoute>([], {
      queryParams: of({q: "123"})
    });
    title = jasmine.createSpyObj<Title>(["setTitle"]);
    meta = jasmine.createSpyObj<Meta>(["updateTag"]);
    component = new QuestionsComponent(route, title, meta);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set title based on query params", () => {
    component.ngOnInit();
    expect(title.setTitle).toHaveBeenCalledWith("123 - Search | shiro-questions");
    expect(meta.updateTag).toHaveBeenCalled();
  });

  it("should set default title", () => {
    route = jasmine.createSpyObj<ActivatedRoute>([], {
      queryParams: of({})
    });
    component = new QuestionsComponent(route, title, meta);
    component.ngOnInit();
    expect(title.setTitle).toHaveBeenCalledWith("Explore - Search | shiro-questions");
    expect(meta.updateTag).toHaveBeenCalled();
  });
});

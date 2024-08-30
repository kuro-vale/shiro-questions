import {HomeComponent} from "./home.component";
import {CategoryService} from "../category/category.service";
import {Category} from "../category/category";
import {of} from "rxjs";
import {CategoriesIcons, CategoriesTranslations} from "../base/constants";
import {Meta} from "@angular/platform-browser";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let meta: jasmine.SpyObj<Meta>;

  beforeEach(async () => {
    const categories: Category[] = [{name: "Food"}, {name: "Music"}, {name: "Hentai"}];
    const categoryServiceSpy = jasmine.createSpyObj<CategoryService>(["getAllCategories"]);
    categoryServiceSpy.getAllCategories.and.returnValue(of(categories));
    meta = jasmine.createSpyObj<Meta>(["updateTag"]);
    component = new HomeComponent(categoryServiceSpy, meta);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should map categories", (done) => {
    const expectedCategories = [
      {label: CategoriesTranslations.All, icon: CategoriesIcons.All, value: "All"},
      {label: CategoriesTranslations.Food, icon: CategoriesIcons.Food, value: "Food"},
      {label: CategoriesTranslations.Music, icon: CategoriesIcons.Music, value: "Music"}
    ];
    component.categories$.subscribe({
      next: categories => {
        expect(categories).toEqual(expectedCategories);
        done();
      }, error: () => done.fail
    });
  });

  it("should create meta tag", () => {
    component.ngOnInit();
    expect(meta.updateTag).toHaveBeenCalled();
  });
});

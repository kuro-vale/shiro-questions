import {HomeComponent} from "./home.component";
import {CategoryService} from "../../components/category/category.service";
import {Category} from "../../components/category/category";
import {of} from "rxjs";
import {CategoriesIcons, CategoriesTranslations} from "../../constants";

describe("HomeComponent", () => {
  let component: HomeComponent;

  beforeEach(async () => {
    const categories: Category[] = [{name: "Food"}, {name: "Music"}, {name: "Hentai"}];
    const categoryServiceSpy = jasmine.createSpyObj<CategoryService>(["getAllCategories"]);
    categoryServiceSpy.getAllCategories.and.returnValue(of(categories));
    component = new HomeComponent(categoryServiceSpy);
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
});
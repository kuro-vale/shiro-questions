import {Injectable} from "@angular/core";
import {Category} from "./category";
import {catchError, of} from "rxjs";
import {CategoriesIcons, CategoriesTranslations} from "../../constants";
import {BaseService} from "../base/base.service";

@Injectable({
  providedIn: "root"
})
export class CategoryService extends BaseService {
  private readonly endpoint = "/categories";

  constructor() {
    super();
  }

  static getCategoryTranslation(category: string) {
    const categoriesTranslations: { [key: string]: string } = CategoriesTranslations;
    if (Object.hasOwn(categoriesTranslations, category)) {
      return categoriesTranslations[category];
    }
    console.warn("Missing translation for category:", category);
    return "";
  }

  static getCategoryIcon(category: string) {
    const categoriesIcons: { [key: string]: string } = CategoriesIcons;
    if (Object.hasOwn(categoriesIcons, category)) {
      return categoriesIcons[category];
    }
    console.warn("Missing icon for category:", category);
    return "";
  }

  getAllCategories() {
    return this.client.get<Category[]>(`${this.apiUrl}${this.endpoint}`)
      .pipe(
        catchError((_, caught) => {
          this.showError($localize`:@@error_getAllCat:Error fetching the categories`);
          caught = of([]);
          return caught;
        })
      );
  }
}

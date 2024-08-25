import {Injectable} from "@angular/core";
import {Category} from "./category";
import {catchError, of, tap} from "rxjs";
import {apiUrl, CategoriesIcons, CategoriesTranslations} from "../../constants";
import {HttpClient} from "@angular/common/http";
import {ErrorService} from "../base/error/error.service";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  private readonly endpoint = `${apiUrl}/categories`;
  private categoryCache: Category[] = [];

  constructor(
    private readonly client: HttpClient,
    private readonly errorService: ErrorService,
  ) {
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
    if (this.categoryCache.length > 0) return of(this.categoryCache);
    return this.client.get<Category[]>(`${this.endpoint}`)
      .pipe(
        tap(c => {
          this.categoryCache = c;
        }),
        catchError((_, caught) => {
          this.errorService.showError($localize`:@@error_getAllCat:Error fetching the categories`);
          caught = of([]);
          return caught;
        })
      );
  }
}

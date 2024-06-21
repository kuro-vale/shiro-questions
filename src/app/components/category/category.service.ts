import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Category} from "./category";
import {catchError, map, of} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CategoriesIcons, CategoriesTranslations} from "../../shared/constants";
import {BaseService} from "../../shared/base.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class CategoryService extends BaseService {
  private readonly endpoint = "/categories";
  private categories: Category[] = [];

  constructor(private readonly client: HttpClient, snackBar: MatSnackBar, router: Router) {
    super(snackBar, router);
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
    if (this.categories.length > 0) return of(this.categories);
    return this.client.get<Category[]>(`${this.apiUrl}${this.endpoint}`)
      .pipe(
        map(c => this.categories = c),
        catchError((_, caught) => {
          this.showError($localize`:@@error_getAllCat:Error fetching the categories`);
          caught = of([]);
          return caught;
        })
      );
  }
}

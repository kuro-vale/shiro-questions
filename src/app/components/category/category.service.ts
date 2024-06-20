import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Category} from "./category";
import {environment} from "../../../environments/environment";
import {catchError, of} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CategoriesIcons, CategoriesTranslations} from "../../constants";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  private readonly apiUrl = new URL(environment.apiUrl).origin;
  private readonly endpoint = "/categories";

  constructor(private readonly client: HttpClient, private readonly snackBar: MatSnackBar) {
  }

  getAllCategories() {
    return this.client.get<Category[]>(`${this.apiUrl}${this.endpoint}`)
      .pipe(catchError((_, caught) => {
        this.snackBar.open($localize`:@@error_getAllCat:Error fetching the categories`, "", {duration: 5000});
        caught = of([]);
        return caught;
      }));
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
}

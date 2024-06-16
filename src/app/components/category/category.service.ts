import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Category} from "./category";
import {environment} from "../../../environments/environment";
import {catchError, of} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  private apiUrl = new URL(environment.apiUrl).origin;

  constructor(private readonly client: HttpClient, private readonly snackBar: MatSnackBar) {
  }

  getAllCategories() {
    return this.client.get<Category[]>(`${this.apiUrl}/categories`)
      .pipe(catchError((_, caught) => {
        this.snackBar.open($localize`:@@error_getAllCat:Error fetching the categories`, "", {duration: 5000});
        caught = of([]);
        return caught;
      }));
  }
}

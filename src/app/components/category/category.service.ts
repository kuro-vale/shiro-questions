import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Category} from "./category";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  constructor(private readonly client: HttpClient) {
  }

  getAllCategories() {
    return this.client.get<Category[]>(`${environment.apiUrl}categories`);
  }
}

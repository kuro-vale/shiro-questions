import {Component} from "@angular/core";
import {MatButton} from "@angular/material/button";
import {MatListItem, MatListItemIcon, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {CategoryService} from "../../components/category/category.service";
import {AsyncPipe} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {map} from "rxjs";
import {CategoriesIcons, Icons} from "../../constants";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [MatButton, MatListItem, MatIcon, MatListItemIcon, AsyncPipe, MatProgressSpinner, MatNavList],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css"
})
export class HomeComponent {
  categoriesIcons: { [key: string]: string } = CategoriesIcons;
  $categories = this.categoryService.getAllCategories().pipe(map(cats => {
    const allCats = {name: $localize`:@@cat_all_categories:All categories`, icon: Icons.Apps};
    return [
      allCats,
      ...cats.map(c => ({
        name: c.name,
        icon: this.categoriesIcons[c.name]
      }))
    ];
  }));

  constructor(private readonly categoryService: CategoryService) {
  }
}

import {Component} from "@angular/core";
import {MatButton} from "@angular/material/button";
import {MatListItem, MatListItemIcon, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {CategoryService} from "../../components/category/category.service";
import {AsyncPipe} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {map} from "rxjs";
import {CategoriesIcons, CategoriesTranslations} from "../../constants";
import {CategoryOption} from "../../components/category/category";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [MatButton, MatListItem, MatIcon, MatListItemIcon, AsyncPipe, MatProgressSpinner, MatNavList],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css"
})
export class HomeComponent {
  categories$ = this.categoryService.getAllCategories()
    .pipe(map((cats): CategoryOption[] => {
      return [{name: "All"}, ...cats].map(c => ({
        label: this.getCategoryTranslation(c.name),
        icon: this.getCategoryIcon(c.name),
        value: c.name
      })).filter(c => c.label && c.icon);
    }));

  constructor(private readonly categoryService: CategoryService) {
  }

  getCategoryTranslation(category: string) {
    const categoriesTranslations: { [key: string]: string } = CategoriesTranslations;
    if (Object.hasOwn(categoriesTranslations, category)) {
      return categoriesTranslations[category];
    }
    console.warn("Missing translation for category:", category);
    return "";
  }

  getCategoryIcon(category: string) {
    const categoriesIcons: { [key: string]: string } = CategoriesIcons;
    if (Object.hasOwn(categoriesIcons, category)) {
      return categoriesIcons[category];
    }
    console.warn("Missing icon for category:", category);
    return "";
  }
}

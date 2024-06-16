import {Component} from "@angular/core";
import {MatButton} from "@angular/material/button";
import {MatList, MatListItem, MatListItemIcon} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {CategoryService} from "../../components/category/category.service";
import {AsyncPipe} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {map} from "rxjs";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [MatButton, MatList, MatListItem, MatIcon, MatListItemIcon, MatGridList, MatGridTile, AsyncPipe, MatProgressSpinner],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css"
})
export class HomeComponent {
  constructor(private readonly categoryService: CategoryService) {
  }

  $categories = this.categoryService.getAllCategories().pipe(map(c => {
    return [{name: $localize `:@@all_categories:All categories`}, ...c];
  }));
}

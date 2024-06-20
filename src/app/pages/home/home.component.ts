import {Component, OnInit} from "@angular/core";
import {MatButton} from "@angular/material/button";
import {MatListItem, MatListItemIcon, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {CategoryService} from "../../components/category/category.service";
import {AsyncPipe} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {map} from "rxjs";
import {Icons} from "../../shared/constants";
import {CategoryOption} from "../../components/category/category";
import {Meta} from "@angular/platform-browser";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [MatButton, MatListItem, MatIcon, MatListItemIcon, AsyncPipe, MatProgressSpinner, MatNavList],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css"
})
export class HomeComponent implements OnInit {
  categories$ = this.categoryService.getAllCategories()
    .pipe(map((cats): CategoryOption[] => {
      return [{name: "All"}, ...cats].map(c => ({
        label: CategoryService.getCategoryTranslation(c.name),
        icon: CategoryService.getCategoryIcon(c.name),
        value: c.name
      })).filter(c => c.label && c.icon);
    }));
  protected readonly Icons = Icons;

  constructor(private readonly categoryService: CategoryService, private readonly metaService: Meta) {
  }

  ngOnInit() {
    this.metaService.addTag({name: "description", content: $localize`:@@home_desc:A place to ask with confidence`});
  }
}

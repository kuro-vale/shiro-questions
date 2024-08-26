import {Component, OnInit} from "@angular/core";
import {MatButton} from "@angular/material/button";
import {MatListItem, MatListItemIcon, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {CategoryService} from "../category/category.service";
import {AsyncPipe} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {map} from "rxjs";
import {AllCategories, Icons, MetaConstants, Paths} from "../../constants";
import {CategoryOption} from "../category/category";
import {Meta} from "@angular/platform-browser";
import {UserService} from "../user/user.service";
import {AskQuestionComponent} from "../question/ask-question/ask-question.component";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [MatButton, MatListItem, MatIcon, MatListItemIcon, AsyncPipe, MatProgressSpinner, MatNavList],
  templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
  user = this.userService.currentUser;
  categories$ = this.categoryService.getAllCategories()
    .pipe(map((cats): CategoryOption[] => {
      return [{name: AllCategories}, ...cats].map(c => ({
        label: CategoryService.getCategoryTranslation(c.name),
        icon: CategoryService.getCategoryIcon(c.name),
        value: c.name
      })).filter(c => c.label && c.icon);
    }));
  protected readonly Icons = Icons;
  protected readonly Paths = Paths;

  constructor(
    private readonly categoryService: CategoryService,
    private readonly metaService: Meta,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.metaService.updateTag({
      name: MetaConstants.Description,
      content: $localize`:@@home_desc:A place to ask with confidence`
    });
  }

  async openAskQuestionDialog() {
    if (!this.user()) {
      await this.router.navigate([Paths.Register]);
      return;
    }
    this.dialog.open(AskQuestionComponent, {backdropClass: "bg-[--navbar]"});
  }

  async searchCategory(category: string) {
    await this.router.navigate([Paths.Questions], {queryParams: {category}});
  }
}

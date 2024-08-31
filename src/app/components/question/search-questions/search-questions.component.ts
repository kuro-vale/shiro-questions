import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {startWith, switchMap, takeUntil} from "rxjs";
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {QuestionCardComponent} from "../question-card/question-card.component";
import {QuestionService} from "../question.service";
import {CategoryService} from "../../category/category.service";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {AllCategories} from "../../base/constants";
import {BaseComponent} from "../../base/base.component";

@Component({
  selector: "app-search-questions",
  standalone: true,
  imports: [
    AsyncPipe,
    MatPaginator,
    MatProgressSpinner,
    NgOptimizedImage,
    QuestionCardComponent,
    MatButtonToggleGroup,
    MatButtonToggle,
    ReactiveFormsModule
  ],
  templateUrl: "./search-questions.component.html"
})
export class SearchQuestionsComponent extends BaseComponent implements OnInit {
  @Input({required: true})
  searchType!: "userQuestions" | "all";
  page = 1;
  categories$ = this.categoryService.getAllCategoryOptions();
  categoryControl = new FormControl(AllCategories);
  questions$ = this.route.queryParams.pipe(switchMap(qp => {
    this.page = parseInt(qp["page"]) || 1;
    const q = qp["q"];
    const category = qp["category"];
    if (category) {
      this.categoryControl.setValue(category, {emitEvent: false});
    }
    const key$ = this.searchType == "all"
      ? this.questionService.searchQuestions(this.page, q, category)
      : this.questionService.getUserQuestions(this.page, q, category);
    return key$.pipe(startWith(null));
  }));
  @ViewChild("categoryButtons")
  categoryButtons!: ElementRef;

  constructor(
    private readonly questionService: QuestionService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly categoryService: CategoryService,
  ) {
    super();
  }

  ngOnInit() {
    this.categoryControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(async c => {
      await this.router.navigate([], {queryParams: {page: 1, category: c}, queryParamsHandling: "merge"});
    });
  }

  async nextPage(event: PageEvent) {
    await this.router.navigate([], {queryParams: {page: event.pageIndex + 1}, queryParamsHandling: "merge"});
  }

  scrollLeft() {
    this.categoryButtons.nativeElement.scrollBy({left: -250, behavior: "smooth"});
  }

  scrollRight() {
    this.categoryButtons.nativeElement.scrollBy({left: 250, behavior: "smooth"});
  }
}

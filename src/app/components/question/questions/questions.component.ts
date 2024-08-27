import {Component, OnInit} from "@angular/core";
import {SearchQuestionsComponent} from "../search-questions/search-questions.component";
import {ActivatedRoute} from "@angular/router";
import {Meta, Title} from "@angular/platform-browser";
import {BaseComponent} from "../../base/base.component";
import {takeUntil} from "rxjs";
import {MetaConstants} from "../../../constants";

@Component({
  selector: "app-questions",
  standalone: true,
  imports: [
    SearchQuestionsComponent
  ],
  templateUrl: "./questions.component.html"
})
export class QuestionsComponent extends BaseComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly title: Title,
    private readonly meta: Meta,
  ) {
    super();
  }

  ngOnInit() {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(qp => {
      const query = qp["q"] || $localize`:@@explore:Explore`;
      this.title.setTitle(`${query} - ${$localize`:@@search:Search`} | shiro-questions`);
    });
    this.meta.updateTag({
      name: MetaConstants.Description,
      content: $localize`:@@questions_desc:Search questions in shiro-questions!`
    });
  }
}

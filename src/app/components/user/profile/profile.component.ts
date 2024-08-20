import {Component, effect, OnInit} from "@angular/core";
import {UserService} from "../user.service";
import {Meta, Title} from "@angular/platform-browser";
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {BaseComponent} from "../../base/base.component";
import {MetaConstants} from "../../../constants";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {QuestionService} from "../../question/question.service";
import {QuestionCardComponent} from "../../question/question-card/question-card.component";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [
    AsyncPipe,
    MatTabGroup,
    MatTab,
    NgOptimizedImage,
    QuestionCardComponent
  ],
  templateUrl: "./profile.component.html",
  styleUrl: "profile.component.css"
})
export class ProfileComponent extends BaseComponent implements OnInit {
  user = this.userService.currentUser;
  questions$ = this.questionService.getUserQuestions();

  constructor(
    private readonly userService: UserService,
    title: Title,
    private readonly meta: Meta,
    private readonly questionService: QuestionService,
  ) {
    super();
    effect(() => {
      title.setTitle(`${this.user()?.username || $localize`:@@profile_title:Your profile`} | shiro-questions`);
    });
  }

  ngOnInit() {
    this.meta.updateTag({
      name: MetaConstants.Description,
      content: $localize`:@@profile_desc:Your personal profile in shiro-questions!`
    });
  }
}

import {Component, Input} from "@angular/core";
import {Question} from "../question";
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {UserService} from "../../user/user.service";
import {MatButton} from "@angular/material/button";
import {CategoryNamePipe} from "../../category/category-name.pipe";
import {MatIcon} from "@angular/material/icon";
import {Icons} from "../../../constants";
import {NgClass, NgOptimizedImage} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {AskQuestionComponent} from "../ask-question/ask-question.component";

@Component({
  selector: "app-question-card",
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardAvatar,
    MatCardTitle,
    MatCardContent,
    MatCardSubtitle,
    MatCardActions,
    MatButton,
    CategoryNamePipe,
    MatIcon,
    NgClass,
    NgOptimizedImage
  ],
  templateUrl: "./question-card.component.html",
  styleUrl: "question-card.component.css"
})
export class QuestionCardComponent {
  @Input({required: true})
  question!: Question;
  user = this.userService.currentUser();
  Icons = Icons;
  solvedTranslations = {
    Solved: $localize`:@@solved:Solved`,
    Unsolved: $localize`:@@unsolved:Unsolved`
  };

  constructor(
    private readonly userService: UserService,
    private readonly dialog: MatDialog,
  ) {
  }

  editQuestion() {
    this.dialog.open(AskQuestionComponent, {data: this.question});
  }
}

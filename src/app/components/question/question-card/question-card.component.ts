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
import {Icons, Paths} from "../../base/constants";
import {NgClass, NgOptimizedImage} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {AskQuestionComponent} from "../ask-question/ask-question.component";
import {QuestionService} from "../question.service";
import {BaseComponent} from "../../base/base.component";
import {takeUntil} from "rxjs";
import {DeleteQuestionComponent} from "../delete-question/delete-question.component";
import {slideToLeft} from "../../base/animations";
import {RouterLink} from "@angular/router";

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
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: "./question-card.component.html",
  styleUrl: "question-card.component.css",
  animations: [slideToLeft]
})
export class QuestionCardComponent extends BaseComponent {
  @Input({required: true})
  question!: Question;
  user = this.userService.currentUser;
  protected readonly Icons = Icons;
  protected readonly Paths = Paths;
  solvedTranslations = {
    Solved: $localize`:@@solved:Solved`,
    Unsolved: $localize`:@@unsolved:Unsolved`
  };
  animationState = "in";

  constructor(
    private readonly userService: UserService,
    private readonly dialog: MatDialog,
    private readonly questionService: QuestionService,
  ) {
    super();
  }

  editQuestion() {
    this.dialog.open(AskQuestionComponent, {data: this.question});
  }

  markAsSolved() {
    this.question.solved = true;
    this.questionService.solveQuestion(this.question.id).pipe(takeUntil(this.destroy$))
      .subscribe(q => {
        if (!q) {
          this.question.solved = false;
        }
      });
  }

  deleteQuestion() {
    const dialogRef = this.dialog.open(DeleteQuestionComponent);
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe((e: boolean) => {
      if (e) {
        this.animationState = "out";
        this.questionService.deleteQuestion(this.question.id).subscribe(q => {
          if (q === false) {
            this.animationState = "in";
          }
        });
      }
    });
  }
}

import {Component, Input} from "@angular/core";
import {Answer} from "../answer";
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardTitle
} from "@angular/material/card";
import {NgOptimizedImage} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {Icons} from "../../base/constants";
import {MatIcon} from "@angular/material/icon";
import {UserService} from "../../user/user.service";
import {AnswerService} from "../answer.service";
import {BaseComponent} from "../../base/base.component";
import {takeUntil} from "rxjs";

@Component({
  selector: "app-answer-card",
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardAvatar,
    NgOptimizedImage,
    MatCardHeader,
    MatCardActions,
    MatButton,
    MatIcon
  ],
  templateUrl: "./answer-card.component.html"
})
export class AnswerCardComponent extends BaseComponent {
  protected readonly Icons = Icons;
  user = this.userService.currentUser;
  @Input({required: true})
  answer!: Answer;
  upVotesAdded = 0;
  downVotesAdded = 0;

  constructor(
    private readonly userService: UserService,
    private readonly answerService: AnswerService,
  ) {
    super();
  }

  createUpvote() {
    if (this.upVotesAdded > 0) return;
    this.upVotesAdded++;
    this.downVotesAdded = 0;
    this.answerService.addUpvote(this.answer.id).pipe(takeUntil(this.destroy$)).subscribe(x => {
      if (x === false) {
        this.upVotesAdded = 0;
      }
    });
  }

  createDownVote() {
    if (this.downVotesAdded > 0) return;
    this.upVotesAdded = 0;
    this.downVotesAdded++;
    this.answerService.addDownVote(this.answer.id).pipe(takeUntil(this.destroy$)).subscribe(x => {
      if (x === false) {
        this.downVotesAdded = 0;
      }
    });
  }
}

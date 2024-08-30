import {Component, ElementRef, Input, ViewChild} from "@angular/core";
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
import {Icons, Paths} from "../../base/constants";
import {MatIcon} from "@angular/material/icon";
import {UserService} from "../../user/user.service";
import {AnswerService} from "../answer.service";
import {BaseComponent} from "../../base/base.component";
import {takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {slideToLeft} from "../../base/animations";
import {DeleteAnswerComponent} from "../delete-answer/delete-answer.component";
import {MatDialog} from "@angular/material/dialog";

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
  templateUrl: "./answer-card.component.html",
  animations: [slideToLeft]
})
export class AnswerCardComponent extends BaseComponent {
  protected readonly Icons = Icons;
  user = this.userService.currentUser;

  @Input({required: true})
  answer!: Answer;
  @ViewChild("edited")
  editedBody!: ElementRef<HTMLParagraphElement>;

  upVotesAdded = 0;
  downVotesAdded = 0;
  animationState = "in";

  constructor(
    private readonly userService: UserService,
    private readonly answerService: AnswerService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
  ) {
    super();
  }

  async createUpvote() {
    if (!this.user()) {
      await this.router.navigate([Paths.Login]);
      return;
    }
    if (this.upVotesAdded > 0) return;
    this.upVotesAdded++;
    this.downVotesAdded = 0;
    this.answerService.addUpvote(this.answer.id).pipe(takeUntil(this.destroy$)).subscribe(x => {
      if (x === false) {
        this.upVotesAdded = 0;
      }
    });
  }

  async createDownVote() {
    if (!this.user()) {
      await this.router.navigate([Paths.Login]);
      return;
    }
    if (this.downVotesAdded > 0) return;
    this.upVotesAdded = 0;
    this.downVotesAdded++;
    this.answerService.addDownVote(this.answer.id).pipe(takeUntil(this.destroy$)).subscribe(x => {
      if (x === false) {
        this.downVotesAdded = 0;
      }
    });
  }

  deleteAnswer() {
    const dialogRef = this.dialog.open(DeleteAnswerComponent);
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe((e: boolean) => {
      if (e) {
        this.animationState = "out";
        this.answerService.deleteAnswer(this.answer.id).subscribe(q => {
          if (q === false) {
            this.animationState = "in";
          }
        });
      }
    });
  }

  saveAnswer(event: Event) {
    event.preventDefault();
    this.editedBody.nativeElement.contentEditable = "false";
    window.getSelection()?.removeAllRanges();
    this.answerService.editAnswer(this.answer.id, this.editedBody.nativeElement.innerText)
      .pipe(takeUntil(this.destroy$)).subscribe();
  }

  editAnswer() {
    this.editedBody.nativeElement.contentEditable = "true";
    const range = document.createRange();
    range.selectNodeContents(this.editedBody.nativeElement);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
}

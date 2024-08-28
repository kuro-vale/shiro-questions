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
import {Icons} from "../../../constants";
import {MatIcon} from "@angular/material/icon";
import {UserService} from "../../user/user.service";

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
export class AnswerCardComponent {
  protected readonly Icons = Icons;
  user = this.userService.currentUser;
  @Input({required: true})
  answer!: Answer;

  constructor(
    private readonly userService: UserService,
  ) {
  }
}

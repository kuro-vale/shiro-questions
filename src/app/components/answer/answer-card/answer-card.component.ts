import {Component, Input} from "@angular/core";
import {Answer} from "../answer";

@Component({
  selector: "app-answer-card",
  standalone: true,
  imports: [],
  templateUrl: "./answer-card.component.html"
})
export class AnswerCardComponent {
  @Input({required: true})
  answer!: Answer;
}

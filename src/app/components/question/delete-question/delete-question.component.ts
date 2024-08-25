import {Component} from "@angular/core";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: "app-delete-question",
  standalone: true,
  imports: [
    MatDialogClose,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogTitle
  ],
  templateUrl: "./delete-question.component.html"
})
export class DeleteQuestionComponent {
}

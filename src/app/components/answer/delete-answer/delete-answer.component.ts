import {Component} from "@angular/core";
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";

@Component({
  selector: "app-delete-answer",
  standalone: true,
  imports: [
    MatDialogClose,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogTitle
  ],
  templateUrl: "./delete-answer.component.html",
})
export class DeleteAnswerComponent {

}

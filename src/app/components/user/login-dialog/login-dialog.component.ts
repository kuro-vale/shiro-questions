import {Component} from "@angular/core";
import {MatDialog, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {UserFormComponent} from "../user-form/user-form.component";
import {RegisterDialogComponent} from "../register-dialog/register-dialog.component";
import {BaseComponent} from "../../../shared/BaseComponent";
import {takeUntil} from "rxjs";

@Component({
  selector: "app-login-dialog",
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    UserFormComponent
  ],
  templateUrl: "./login-dialog.component.html",
})
export class LoginDialogComponent extends BaseComponent {
  constructor(private readonly dialog: MatDialog) {
    super();
  }

  openNext() {
    this.dialog.open(RegisterDialogComponent).afterOpened().pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.dialog.openDialogs.forEach(d => {
          if (d.componentInstance instanceof LoginDialogComponent) {
            d.close();
          }
        });
      });
  }
}

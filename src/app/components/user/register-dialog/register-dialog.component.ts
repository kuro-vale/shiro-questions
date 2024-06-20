import {Component} from "@angular/core";
import {MatDialog, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {UserFormComponent} from "../user-form/user-form.component";
import {LoginDialogComponent} from "../login-dialog/login-dialog.component";
import {BaseComponent} from "../../../shared/BaseComponent";
import {takeUntil} from "rxjs";

@Component({
  selector: "app-register-dialog",
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    UserFormComponent,
  ],
  templateUrl: "./register-dialog.component.html"
})
export class RegisterDialogComponent extends BaseComponent {
  constructor(private readonly dialog: MatDialog) {
    super();
  }

  openNext() {
    this.dialog.open(LoginDialogComponent).afterOpened().pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.dialog.openDialogs.forEach(d => {
          if (d.componentInstance instanceof RegisterDialogComponent) {
            d.close();
          }
        });
      });
  }
}

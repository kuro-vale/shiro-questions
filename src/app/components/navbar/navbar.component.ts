import {Component} from "@angular/core";
import {MatIcon} from "@angular/material/icon";
import {Icons, Paths} from "../../shared/constants";
import {RouterModule} from "@angular/router";
import {NgClass} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuContent, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatDialog} from "@angular/material/dialog";
import {RegisterDialogComponent} from "../user/register-dialog/register-dialog.component";
import {LoginDialogComponent} from "../user/login-dialog/login-dialog.component";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [MatIcon, RouterModule, NgClass, MatIconButton, MatMenu, MatMenuTrigger, MatMenuItem, MatButton, MatMenuContent],
  templateUrl: "./navbar.component.html",
  styleUrl: "navbar.component.css",
})
export class NavbarComponent {
  protected readonly Icons = Icons;
  protected readonly Paths = Paths;
  protected focused = false;

  constructor(private readonly dialog: MatDialog) {
  }

  openRegisterDialog() {
    this.dialog.open(RegisterDialogComponent);
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent);
  }
}

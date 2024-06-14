import {Component} from "@angular/core";
import {MatIcon} from "@angular/material/icon";
import {Icons} from "../constants";
import {RouterModule} from "@angular/router";
import {NgClass} from "@angular/common";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [MatIcon, RouterModule, NgClass, MatIconButton],
  templateUrl: "./navbar.component.html",
  styleUrl: "navbar.component.css",
})
export class NavbarComponent {
  protected readonly Icons = Icons;
  protected focused = false;
}

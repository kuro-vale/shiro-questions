import {Component} from "@angular/core";
import {MatIcon} from "@angular/material/icon";
import {Icons} from "../constants";
import {RouterModule} from "@angular/router";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [MatIcon, RouterModule],
  templateUrl: "./navbar.component.html",
  styleUrl: "navbar.component.css"
})
export class NavbarComponent {
  protected readonly Icons = Icons;
}

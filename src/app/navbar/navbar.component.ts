import {Component} from "@angular/core";
import {MatIcon, MatIconRegistry} from "@angular/material/icon";
import {Icons} from "../constants";
import {RouterModule} from "@angular/router";
import {NgClass} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [MatIcon, RouterModule, NgClass, MatIconButton, MatMenu, MatMenuTrigger, MatMenuItem, MatButton],
  templateUrl: "./navbar.component.html",
  styleUrl: "navbar.component.css",
})
export class NavbarComponent {
  protected readonly Icons = Icons;
  protected focused = false;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon("app-logo", sanitizer.bypassSecurityTrustResourceUrl("logo.svg"));
  }
}

import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {FooterComponent} from "./components/footer/footer.component";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {Icons} from "./constants";
import {UserService} from "./components/user/user.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: "./app.component.html"
})
export class AppComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, userService: UserService) {
    iconRegistry.addSvgIcon(Icons.AppLogo, sanitizer.bypassSecurityTrustResourceUrl("/logo.svg"));
    userService.getCurrentUser().subscribe();
  }
}

import {Component, OnInit} from "@angular/core";
import {UserService} from "../../components/user/user.service";
import {Title} from "@angular/platform-browser";
import {AsyncPipe} from "@angular/common";
import {takeUntil} from "rxjs";
import {BaseComponent} from "../../shared/base.component";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: "./profile.component.html"
})
export class ProfileComponent extends BaseComponent implements OnInit {
  currentUser$ = this.userService.getCurrentUser();

  constructor(private readonly userService: UserService, private readonly title: Title) {
    super();
  }

  ngOnInit(): void {
    this.currentUser$.pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.title.setTitle(`${user?.username} | shiro-questions`);
      });
  }
}

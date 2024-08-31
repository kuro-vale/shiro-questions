import {TestBed} from "@angular/core/testing";

import {AnswerCardComponent} from "./answer-card.component";
import {UserService} from "../../user/user.service";
import {AnswerService} from "../answer.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ChangeDetectorRef} from "@angular/core";

describe("AnswerCardComponent", () => {
  let component: AnswerCardComponent;
  let userService: UserService;
  let answerService: AnswerService;
  let router: Router;
  let dialog: MatDialog;
  let cd: ChangeDetectorRef;

  beforeEach(async () => {
    userService = jasmine.createSpyObj<UserService>(["currentUser"]);
    answerService = jasmine.createSpyObj<AnswerService>(["addUpvote"]);
    router = TestBed.inject(Router);
    dialog = jasmine.createSpyObj<MatDialog>(["open"]);
    cd = jasmine.createSpyObj<ChangeDetectorRef>(["detectChanges"]);
    component = new AnswerCardComponent(userService, answerService, router, dialog, cd);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

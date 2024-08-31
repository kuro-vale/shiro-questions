import {AnswerCardComponent} from "./answer-card.component";
import {UserService} from "../../user/user.service";
import {AnswerService} from "../answer.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ChangeDetectorRef, ElementRef, signal} from "@angular/core";
import {of} from "rxjs";
import {DeleteAnswerComponent} from "../delete-answer/delete-answer.component";

describe("AnswerCardComponent", () => {
  let component: AnswerCardComponent;
  let userService: UserService;
  let answerService: jasmine.SpyObj<AnswerService>;
  let router: Router;
  let dialog: jasmine.SpyObj<MatDialog>;
  let cd: ChangeDetectorRef;

  beforeEach(async () => {
    userService = jasmine.createSpyObj<UserService>([], {
      currentUser: signal(null)
    });
    answerService = jasmine.createSpyObj<AnswerService>(["addUpvote", "addDownVote", "deleteAnswer", "editAnswer"]);
    router = jasmine.createSpyObj<Router>(["navigate"]);
    const openDialog = jasmine.createSpyObj<MatDialogRef<DeleteAnswerComponent>>(["afterClosed"]);
    openDialog.afterClosed.and.returnValue(of(true));
    dialog = jasmine.createSpyObj<MatDialog>(["open"]);
    dialog.open.and.returnValue(openDialog);
    cd = jasmine.createSpyObj<ChangeDetectorRef>(["detectChanges"]);
    component = new AnswerCardComponent(userService, answerService, router, dialog, cd);
    component.answer = {id: "123", body: "", downvotes: 0, upvotes: 0, updatedAt: "", createdAt: "", createdBy: ""};
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should change animation state after view init", () => {
    component.ngAfterViewInit();
    expect(component.answer.animateAppendState == "in");
    expect(cd.detectChanges).toHaveBeenCalled();
  });

  it("should create upvote", () => {
    userService.currentUser.set({username: "test"});
    answerService.addUpvote.and.returnValue(of(null));
    component.createUpvote();
    expect(component.upVotesAdded).toBe(1);
  });

  it("should redirect to login page if no user on createUpvote", () => {
    component.createUpvote();
    expect(router.navigate).toHaveBeenCalled();
  });

  it("should prevent additional up votes on createUpvote", () => {
    userService.currentUser.set({username: "test"});
    component.upVotesAdded = 1;
    component.createUpvote();
    expect(answerService.addUpvote).toHaveBeenCalledTimes(0);
  });

  it("should revert up vote on error", () => {
    userService.currentUser.set({username: "test"});
    answerService.addUpvote.and.returnValue(of(false));
    component.createUpvote();
    expect(component.upVotesAdded).toBe(0);
  });

  it("should create down vote", () => {
    userService.currentUser.set({username: "test"});
    answerService.addDownVote.and.returnValue(of(null));
    component.createDownVote();
    expect(component.downVotesAdded).toBe(1);
  });

  it("should redirect to login page if no user on createDownVote", () => {
    component.createDownVote();
    expect(router.navigate).toHaveBeenCalled();
  });

  it("should prevent additional down votes on createDownVote", () => {
    userService.currentUser.set({username: "test"});
    component.downVotesAdded = 1;
    component.createDownVote();
    expect(answerService.addDownVote).toHaveBeenCalledTimes(0);
  });

  it("should revert down vote on error", () => {
    userService.currentUser.set({username: "test"});
    answerService.addDownVote.and.returnValue(of(false));
    component.createDownVote();
    expect(component.downVotesAdded).toBe(0);
  });

  it("should delete answer", () => {
    answerService.deleteAnswer.and.returnValue(of(null));
    component.deleteAnswer();
    expect(component.animateDeleteState).toBe("out");
  });

  it("should revert animation on delete failure", () => {
    answerService.deleteAnswer.and.returnValue(of(false));
    component.deleteAnswer();
    expect(component.animateDeleteState).toBe("in");
  });

  it("should save answer", () => {
    component.answerBody = jasmine.createSpyObj<ElementRef>([], {
      nativeElement: jasmine.createSpyObj<HTMLParagraphElement>([], {
        contentEditable: "true"
      })
    });
    answerService.editAnswer.and.returnValue(of(null));
    component.saveAnswer(jasmine.createSpyObj<MouseEvent>(["preventDefault"]));
    expect().nothing();
  });

  it("should edit answer", () => {
    component.answerBody = jasmine.createSpyObj<ElementRef>([], {
      nativeElement: jasmine.createSpyObj<HTMLParagraphElement>([], {
        contentEditable: "false"
      })
    });
    spyOn(document, "createRange").and.returnValue(jasmine.createSpyObj<Range>(["selectNodeContents"]));
    spyOn(window, "getSelection").and.returnValue(jasmine.createSpyObj<Selection>(["removeAllRanges", "addRange"]));
    component.editAnswer();
    expect().nothing();
  });
});

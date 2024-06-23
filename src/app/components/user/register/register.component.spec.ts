import {TestBed} from "@angular/core/testing";

import {RegisterComponent} from "./register.component";
import {UserService} from "../user.service";
import {Meta} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Paths} from "../../../constants";
import {of} from "rxjs";

describe("RegisterDialogComponent", () => {
  let component: RegisterComponent;
  let userService: jasmine.SpyObj<UserService>;
  let meta: jasmine.SpyObj<Meta>;
  let router: Router;
  let dialog: jasmine.SpyObj<MatDialog>;
  let openDialog: jasmine.SpyObj<MatDialogRef<RegisterComponent>>;

  beforeEach(() => {
    openDialog = jasmine.createSpyObj<MatDialogRef<RegisterComponent>>(["close"], {
      componentInstance: new RegisterComponent(dialog, router, userService, meta)
    });
    dialog = jasmine.createSpyObj<MatDialog>(["open"], {
      get openDialogs(): MatDialogRef<RegisterComponent>[] {
        return [openDialog];
      }
    });
    dialog.open.and.returnValue({
      afterOpened: () => of(true),
    } as any);
    userService = jasmine.createSpyObj<UserService>(["clearCurrentUser"]);
    meta = jasmine.createSpyObj<Meta>(["updateTag"]);
    router = TestBed.inject(Router);
    component = new RegisterComponent(dialog, router, userService, meta);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should create meta on register route", () => {
    spyOnProperty(router, "url").and.returnValue(Paths.Register);
    component.ngOnInit();
    expect(meta.updateTag).toHaveBeenCalled();
  });

  it("should open dialog and close same component dialogs", () => {
    component.openNext();
    expect(dialog.open).toHaveBeenCalled();
    expect(openDialog.close).toHaveBeenCalled();
  });

  it("should redirect on login page", () => {
    spyOnProperty(router, "url").and.returnValue(Paths.Register);
    const navigateSpy = spyOn(router, "navigate");
    component.openNext();
    expect(navigateSpy).toHaveBeenCalled();
  });
});

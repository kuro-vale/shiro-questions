import {LoginComponent} from "./login.component";
import {TestBed} from "@angular/core/testing";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {Meta} from "@angular/platform-browser";
import {Paths} from "../../../constants";
import {of} from "rxjs";


describe("LoginDialogComponent", () => {
  let component: LoginComponent;
  let userService: jasmine.SpyObj<UserService>;
  let meta: jasmine.SpyObj<Meta>;
  let router: Router;
  let dialog: jasmine.SpyObj<MatDialog>;
  let openDialog: jasmine.SpyObj<MatDialogRef<LoginComponent>>;

  beforeEach(() => {
    openDialog = jasmine.createSpyObj<MatDialogRef<LoginComponent>>(["close"], {
      componentInstance: new LoginComponent(dialog, router, userService, meta)
    });
    dialog = jasmine.createSpyObj<MatDialog>(["open"], {
      get openDialogs(): MatDialogRef<LoginComponent>[] {
        return [openDialog];
      }
    });
    dialog.open.and.returnValue({
      afterOpened: () => of(true),
    } as any);
    router = TestBed.inject(Router);
    userService = jasmine.createSpyObj<UserService>(["clearCurrentUser"]);
    meta = jasmine.createSpyObj<Meta>(["updateTag"]);
    component = new LoginComponent(dialog, router, userService, meta);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should create meta on login route", () => {
    spyOnProperty(router, "url").and.returnValue(Paths.Login);
    component.ngOnInit();
    expect(meta.updateTag).toHaveBeenCalled();
  });

  it("should open dialog and close same component dialogs", () => {
    component.openNext();
    expect(dialog.open).toHaveBeenCalled();
    expect(openDialog.close).toHaveBeenCalled();
  });

  it("should redirect on login page", () => {
    spyOnProperty(router, "url").and.returnValue(Paths.Login);
    const navigateSpy = spyOn(router, "navigate");
    component.openNext();
    expect(navigateSpy).toHaveBeenCalled();
  });
});

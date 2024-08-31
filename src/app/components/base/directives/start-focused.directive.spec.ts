import {StartFocusedDirective} from "./start-focused.directive";
import {ElementRef} from "@angular/core";

describe("StartFocusedDirective", () => {
  let elementRef: ElementRef;
  let directive: StartFocusedDirective;
  beforeEach(() => {
    elementRef = jasmine.createSpyObj<ElementRef>([], {
      nativeElement: jasmine.createSpyObj<HTMLElement>(["focus"])
    });
    directive = new StartFocusedDirective(elementRef);
  });

  it("should create an instance", () => {
    expect(directive).toBeTruthy();
  });

  it("should focus on init", () => {
    directive.ngOnInit();
    expect(elementRef.nativeElement.focus).toHaveBeenCalled();
  });
});

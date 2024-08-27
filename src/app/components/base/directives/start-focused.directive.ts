import {Directive, ElementRef, OnInit} from "@angular/core";

@Directive({
  selector: "[startFocused]",
  standalone: true
})
export class StartFocusedDirective implements OnInit {

  constructor(
    private readonly ref: ElementRef
  ) {
  }

  ngOnInit() {
    this.ref.nativeElement.focus();
  }
}

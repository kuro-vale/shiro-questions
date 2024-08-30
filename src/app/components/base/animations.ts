import {animate, group, state, style, transition, trigger} from "@angular/animations";

export const slideToLeft = trigger("slideToLeft", [
  state("in", style({
      opacity: "1",
      display: "block"
    })
  ),
  state("out", style({
      opacity: "0",
      display: "none"
    })
  ),
  transition("in => out", [
    group([
      animate("400ms ease-in-out", style({transform: "translateX(-100%)"})),
      animate("300ms ease-in-out", style({opacity: "0"}))
    ])
  ]),
]);

export const appearUp = trigger("appearUp", [
  state("out", style({
    opacity: "0",
    transform: "translateY(-100%)"
  })),
  state("in", style({
    opacity: "1"
  })),
  transition("out => in", [
    group([
      animate("500ms ease-in-out", style({transform: "translateY(0%)"})),
      animate("500ms ease-in-out", style({opacity: "1"}))
    ])
  ])
]);

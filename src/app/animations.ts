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

import {Pipe, PipeTransform} from "@angular/core";
import {CategoryService} from "./category.service";

@Pipe({
  name: "categoryName",
  standalone: true
})
export class CategoryNamePipe implements PipeTransform {
  transform(value: string): string {
    return CategoryService.getCategoryTranslation(value);
  }
}

import {Injectable} from "@angular/core";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {Subject} from "rxjs";

@Injectable()
export class PaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();
  itemsPerPageLabel = "";
  nextPageLabel = $localize`:@@next_page:Next page`;
  previousPageLabel = $localize`:@@previous_page:Previous page`;
  firstPageLabel = $localize`:@@first_page:First page`;
  lastPageLabel = $localize`:@@last_page:Last page`;

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`:@@no_results:No results`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`:@@total_results:${length} Results` + " - " + $localize`:@@page_of:Page ${page + 1} of ${amountPages}`;
  };
}

import {Injectable} from "@angular/core";
import {apiUrl} from "../base/constants";
import {HttpClient} from "@angular/common/http";
import {catchError, of} from "rxjs";
import {ErrorService} from "../base/error/error.service";

@Injectable({
  providedIn: "root"
})
export class AnswerService {
  private readonly endpoint = `${apiUrl}/answers`;

  constructor(
    private readonly client: HttpClient,
    private readonly errorService: ErrorService,
  ) {
  }

  addUpvote(answerId: string) {
    return this.client.post<null>(`${this.endpoint}/${answerId}/upvotes`, {}).pipe(catchError(_ => {
      this.errorService.showError($localize`:@@error_addUpvote:Error while up-voting this answer`);
      return of(false);
    }));
  }

  addDownVote(answerId: string) {
    return this.client.post<null>(`${this.endpoint}/${answerId}/downvotes`, {}).pipe(catchError(_ => {
      this.errorService.showError($localize`:@@error_addDownVote:Error while down-voting this answer`);
      return of(false);
    }));
  }
}

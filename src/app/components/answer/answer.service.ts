import {Injectable} from "@angular/core";
import {apiUrl} from "../base/constants";
import {HttpClient} from "@angular/common/http";
import {catchError, of} from "rxjs";
import {ErrorService} from "../base/error/error.service";
import {Answer} from "./answer";

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

  deleteAnswer(answerId: string) {
    return this.client.delete<null>(`${this.endpoint}/${answerId}`).pipe(catchError(_ => {
      this.errorService.showError($localize`:@@error_deleteAnswer:Error deleting this answer`);
      return of(false);
    }));
  }

  editAnswer(answerId: string, body: string) {
    return this.client.put<Answer>(`${this.endpoint}/${answerId}`, {body}).pipe(catchError(_ => {
      this.errorService.showError($localize`:@@error_editAnswer:Error editing this answer`);
      return of(null);
    }));
  }
}

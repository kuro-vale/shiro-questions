import {Injectable} from "@angular/core";
import {apiUrl} from "../../constants";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Question, QuestionRequest} from "./question";
import {PageOf} from "../../types";
import {catchError, of} from "rxjs";
import {ErrorService} from "../base/error/error.service";

@Injectable({
  providedIn: "root"
})
export class QuestionService {
  private readonly endpoint = `${apiUrl}/questions`;

  constructor(
    private readonly client: HttpClient,
    private readonly errorService: ErrorService,
  ) {
  }

  getUserQuestions(page = 1, query: string = "") {
    let params = new HttpParams().set("page", page);
    if (query) {
      params = params.append("q", query);
    }
    return this.client.get<PageOf<Question>>(`${this.endpoint}/me`, {params}).pipe(catchError(_ => {
      this.errorService.showError($localize`:@@error_getUserQuestions:Error fetching your questions`);
      return of({items: [], metadata: {per: 0, total: 0}});
    }));
  }

  searchQuestions(page = 1, query: string = "") {
    let params = new HttpParams().set("page", page);
    if (query) {
      params = params.append("q", query);
    }
    return this.client.get<PageOf<Question>>(`${this.endpoint}/search`, {params}).pipe(catchError(_ => {
      this.errorService.showError($localize`:@@error_searchQuestions:Error while searching questions`);
      return of({items: [], metadata: {per: 0, total: 0}});
    }));
  }

  createQuestion(request: QuestionRequest) {
    return this.client.post<Question | null>(`${this.endpoint}`, request).pipe(catchError(_ => {
      this.errorService.showError($localize`:@@error_createQuestions:Error creating the question`);
      return of(null);
    }));
  }

  editQuestion(id: string, request: QuestionRequest) {
    return this.client.put<Question | null>(`${this.endpoint}/${id}`, request).pipe(catchError(_ => {
      this.errorService.showError($localize`:@@error_editQuestions:Error editing this question`);
      return of(null);
    }));
  }

  solveQuestion(id: string) {
    return this.client.patch<Question | null>(`${this.endpoint}/${id}`, {}).pipe(catchError(_ => {
      this.errorService.showError($localize`:@@error_solveQuestions:Error solving your question`);
      return of(null);
    }));
  }

  deleteQuestion(id: string) {
    return this.client.delete<null | false>(`${this.endpoint}/${id}`).pipe(catchError(_ => {
      this.errorService.showError($localize`:@@error_deleteQuestion:Error deleting your question`);
      return of(false);
    }));
  }
}

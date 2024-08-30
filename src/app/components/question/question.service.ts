import {Injectable} from "@angular/core";
import {AllCategories, apiUrl} from "../base/constants";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Question, QuestionRequest} from "./question";
import {defaultPage, PageOf} from "../base/types";
import {catchError, of} from "rxjs";
import {ErrorService} from "../base/error/error.service";
import {Answer} from "../answer/answer";

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

  private getParams(page: number, query: string, category: string) {
    let params = new HttpParams().set("page", page);
    if (query) {
      params = params.append("q", query);
    }
    if (category && category !== AllCategories) {
      params = params.append("category", category);
    }
    return params;
  }

  getUserQuestions(page = 1, query = "", category = "") {
    const params = this.getParams(page, query, category);
    return this.client.get<PageOf<Question>>(`${this.endpoint}/me`, {params}).pipe(catchError(_ => {
      this.errorService.showError($localize`:@@error_getUserQuestions:Error fetching your questions`);
      return of(defaultPage<Question>());
    }));
  }

  searchQuestions(page = 1, query = "", category = "") {
    const params = this.getParams(page, query, category);
    return this.client.get<PageOf<Question>>(`${this.endpoint}/search`, {params}).pipe(catchError(_ => {
      this.errorService.showError($localize`:@@error_searchQuestions:Error while searching questions`);
      return of(defaultPage<Question>());
    }));
  }

  getQuestion(id: string) {
    return this.client.get<Question | null>(`${this.endpoint}/${id}`).pipe(catchError(_ => {
      this.errorService.showError($localize`:@@error_getQuestion:Error while fetching this question`);
      return of(null);
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

  addAnswer(questionId: string, body: string) {
    return this.client.post<Answer | null>(`${this.endpoint}/${questionId}/answers`, {body}).pipe(catchError(_ => {
      this.errorService.showError($localize`:@@error_addAnswer:Error creating the answer`);
      return of(null);
    }));
  }

  getAnswers(questionId: string, page: number) {
    const params = new HttpParams().set("page", page);
    return this.client.get<PageOf<Answer>>(`${this.endpoint}/${questionId}/answers`, {params}).pipe(catchError(_ => {
      this.errorService.showError($localize`:@@error_getAnswers:Error getting this question's answers`);
      return of(defaultPage<Answer>());
    }));
  }
}

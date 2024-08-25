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

  getUserQuestions(page = 1) {
    const params = new HttpParams().set("page", page);
    return this.client.get<PageOf<Question>>(`${this.endpoint}/me`, {params}).pipe(catchError((_, caught) => {
      this.errorService.showError($localize`:@@error_getUserQuestions:Error fetching your questions`);
      caught = of({items: [], metadata: {per: 0, total: 0}});
      return caught;
    }));
  }

  createQuestion(request: QuestionRequest) {
    return this.client.post<Question | null>(`${this.endpoint}`, request).pipe(catchError((_, caught) => {
      this.errorService.showError($localize`:@@error_createQuestions:Error creating the question`);
      caught = of(null);
      return caught;
    }));
  }

  editQuestion(id: string, request: QuestionRequest) {
    return this.client.put<Question | null>(`${this.endpoint}/${id}`, request).pipe(catchError((_, caught) => {
      this.errorService.showError($localize`:@@error_editQuestions:Error editing this question`);
      caught = of(null);
      return caught;
    }));
  }
}

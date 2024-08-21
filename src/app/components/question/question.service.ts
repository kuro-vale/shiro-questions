import {Injectable} from "@angular/core";
import {apiUrl} from "../../constants";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Question} from "./question";
import {PageOf} from "../../types";

@Injectable({
  providedIn: "root"
})
export class QuestionService {
  private readonly endpoint = `${apiUrl}/questions`;

  constructor(
    private readonly client: HttpClient,
  ) {
  }

  getUserQuestions(page = 1) {
    const params = new HttpParams().set("page", page);
    return this.client.get<PageOf<Question>>(`${this.endpoint}/me`, {params});
  }
}

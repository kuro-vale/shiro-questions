import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserAuth, UserRequest} from "./user";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private readonly apiUrl = new URL(environment.apiUrl).origin;
  private readonly endpoint = "/auth";

  constructor(private readonly client: HttpClient, private readonly snackBar: MatSnackBar) {
  }

  register(request: UserRequest) {
    return this.client.post<UserAuth>(`${this.apiUrl}${this.endpoint}/register`, request);
  }

  login(request: UserRequest) {
    return this.client.post<UserAuth>(`${this.apiUrl}${this.endpoint}/login`, request);
  }
}

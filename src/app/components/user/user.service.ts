import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserRequest} from "./user";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private readonly client: HttpClient, private readonly snackBar: MatSnackBar) {
  }

  register(request: UserRequest) {
    // TODO:
    console.log(request);
  }
}

import {ValidationErrors} from "@angular/forms";

export type AppError = {
  message?: string,
  validationErrors?: ValidationErrors
  error: true
}

export type AppSuccess = {
  error: false
}

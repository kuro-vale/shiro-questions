import {ValidationErrors} from "@angular/forms";

export type AppError = {
  validationErrors: ValidationErrors
  error: true
}

export type AppSuccess = {
  error: false
}

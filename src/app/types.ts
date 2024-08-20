import {ValidationErrors} from "@angular/forms";

export type AppError = {
  validationErrors: ValidationErrors
  error: true
}

export type AppSuccess = {
  error: false
}

export type PageOf<T> = {
  items: T[];
  metadata: PageMetadata;
}

type PageMetadata = {
  per: number;
  total: number;
}

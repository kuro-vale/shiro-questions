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

export function defaultPage<T>(): PageOf<T> {
  return {items: [], metadata: {per: 0, total: 0}};
}

type PageMetadata = {
  per: number;
  total: number;
}

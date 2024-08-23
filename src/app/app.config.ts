import {ApplicationConfig, provideZoneChangeDetection} from "@angular/core";
import {provideRouter} from "@angular/router";

import {routes} from "./app.routes";
import {provideClientHydration, withHttpTransferCacheOptions, withI18nSupport} from "@angular/platform-browser";
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {tokenInterceptor} from "./components/token/interceptors/token.interceptor";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {PaginatorIntl} from "../locale/PaginatorIntl";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideClientHydration(withI18nSupport(), withHttpTransferCacheOptions({includeRequestsWithAuthHeaders: true})),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor])),
    {provide: MatPaginatorIntl, useClass: PaginatorIntl}
  ]
};

import { HttpClient } from '@angular/common/http';
import {
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule,
} from '@ngneat/transloco';

import { Injectable, NgModule } from '@angular/core';
import { environment } from '../environments/environment';


@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        prodMode: environment.production,
        availableLangs: [
          { id: 'en', label: 'English' },
          { id: 'es', label: 'Spanish' },
        ],
        reRenderOnLangChange: true,
        fallbackLang: 'es',
        defaultLang: 'en',
        missingHandler: {
          useFallbackTranslation: false,
        },
        // interpolation: ['<<<', '>>>']
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
  ],
})
export class TranslocoRootModule {}

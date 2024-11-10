import { Injectable } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class CustomI18nService {
  // private readonly i18n: I18nService;
  constructor(private readonly i18n: I18nService) {}
  translate(key: string, options?: any) {
    // Get current language using I18nContext.current().lang
    // Use this language to translate the provided key using this.i18n.t() method
    const lang = I18nContext.current().lang;
    // Return the translated value or options parameter (if provided) as the result of the translate method.
    return this.i18n.t(key, { lang, ...options });
  }
}

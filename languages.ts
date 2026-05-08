export const SUPPORTED_LANGUAGES = [
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' as const },
  { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr' as const },
  { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' as const },
  { code: 'zh', name: '中文', flag: '🇨🇳', dir: 'ltr' as const },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷', dir: 'ltr' as const },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' as const },
  { code: 'ur', name: 'اردو', flag: '🇵🇰', dir: 'rtl' as const },
] as const;

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]['code'];
export const DEFAULT_LANGUAGE: LanguageCode = 'ar';

export const isRtl = (lang: LanguageCode) =>
  SUPPORTED_LANGUAGES.find((l) => l.code === lang)?.dir === 'rtl';

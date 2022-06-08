import i18next from 'i18next';

import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
};
const initLanguage = localStorage.getItem('i18nextLng');
const lng = initLanguage?.slice(0, 2);

// Note that we are using createInstance here
const i18n = i18next.createInstance(
  {
    lng,
    fallbackLng: 'fr',
    keySeparator: false,
    ns: ['translation'],
    defaultNS: 'translation',
    react: { useSuspense: false },
    interpolation: { escapeValue: false },
    resources,
  },
  // We must provide a function as second parameter, otherwise i18next errors
  (err, t) => {
    if (err) return console.log(err);
  }
);

export default i18n;

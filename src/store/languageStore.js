// src/store/languageStore.js
import { create } from 'zustand';
import { th } from '../i18n/th';
import { en } from '../i18n/en';

const LANG_KEY = 'pylearn_lang';

export const useLanguageStore = create((set) => ({
  lang: localStorage.getItem(LANG_KEY) || 'th',
  t: localStorage.getItem(LANG_KEY) === 'en' ? en : th,

  setLang: (lang) => {
    localStorage.setItem(LANG_KEY, lang);
    set({ lang, t: lang === 'en' ? en : th });
  },

  toggleLang: () => {
    const current = localStorage.getItem(LANG_KEY) || 'th';
    const next = current === 'th' ? 'en' : 'th';
    localStorage.setItem(LANG_KEY, next);
    set({ lang: next, t: next === 'en' ? en : th });
  },
}));

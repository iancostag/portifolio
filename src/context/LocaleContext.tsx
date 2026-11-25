"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";

export type Locale = "en" | "pt";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: "en",
  setLocale: () => {},
  toggleLocale: () => {},
});

const LOCALE_EVENT = "portfolio-locale-change";

function subscribeLocale(callback: () => void) {
  window.addEventListener(LOCALE_EVENT, callback);
  window.addEventListener("storage", callback);
  window.addEventListener("popstate", callback);
  return () => {
    window.removeEventListener(LOCALE_EVENT, callback);
    window.removeEventListener("storage", callback);
    window.removeEventListener("popstate", callback);
  };
}

function getLocaleSnapshot(): Locale {
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get("lang");
  if (urlLang === "en" || urlLang === "pt") return urlLang;

  const saved = window.localStorage.getItem("portfolio-locale");
  if (saved === "en" || saved === "pt") return saved;

  return "en";
}

function getLocaleServerSnapshot(): Locale {
  return "en";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(
    subscribeLocale,
    getLocaleSnapshot,
    getLocaleServerSnapshot
  );

  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "pt-BR";
    window.localStorage.setItem("portfolio-locale", locale);
  }, [locale]);

  const setLocale = (next: Locale) => {
    window.localStorage.setItem("portfolio-locale", next);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState({}, "", url.toString());
    window.dispatchEvent(new Event(LOCALE_EVENT));
  };

  const toggleLocale = () => {
    setLocale(locale === "en" ? "pt" : "en");
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

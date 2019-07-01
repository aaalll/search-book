declare module "*.scss";
declare module "*.svg";

interface LibrarySearchResult {
  start: number;
  num_found: number;
  numFound: number;
  docs: Book[];
}

interface Book {
  isbn?: number[];
  author_name?: string[];
  title: string;
  key: string;
  language?: string[];
  cover_i?: number;
  cover_edition_key?: string;
  publish_date: string[];
  oclc?: string[];
  lccn?: string[];
  olid?: string[];
}

declare namespace Intl {
  function getCanonicalLocales(locales: string | string[]): string[];
  const RelativeTimeFormat: any;
}

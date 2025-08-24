import React from 'react';

export interface ColumnDefinition {
  key: string;
  label?: string;
  type?: 'string' | 'number' | 'boolean' | 'date';
  valueFunc?: (record: any) => any;
  displayFunc?: (record: any, value: any) => React.ReactNode;
  compareFunc?: (a: any, b: any) => number;
}

export interface SortField {
  key: string;
  reverse: boolean;
}

export interface SearchState {
  global: string | null;
  fields: {
    [key: string]: {
      _type: 'string' | 'number';
      string: {
        text: string | null;
        trim: boolean;
        caseSensitive: boolean;
        isRegex: boolean;
      };
      number: {
        value: number | null;
        omitNonNumeric?: boolean;
        gt?: {
          value: number | null;
          equals: boolean;
        };
        lt?: {
          value: number | null;
          equals: boolean;
        };
      };
    };
  };
}

export const DEBOUNCE_INPUT_TIME_MS = 500;
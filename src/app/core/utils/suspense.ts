import { signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

export interface Suspense<T> {
  isLoading: boolean;
  hasValue: boolean;
  value: T | null;
  hasError: boolean;
  error: any;
}

export type SuspenseSignal<T> = WritableSignal<Suspense<T>>;

export function createSuspense<T>(obs$: Observable<T>): SuspenseSignal<T> {
  const state = signal<Suspense<T>>({
    isLoading: true,
    hasValue: false,
    value: null,
    hasError: false,
    error: null,
  });

  obs$.subscribe({
    next: (data) => {
      state.set({
        isLoading: false,
        hasValue: true,
        value: data,
        hasError: false,
        error: null,
      });
    },
    error: (err) => {
      state.set({
        isLoading: false,
        hasValue: false,
        value: null,
        hasError: true,
        error: err,
      });
    },
  });

  return state;
}

export const getSuspensifyInitialValues = <T>(value: T) => ({
  isLoading: true,
  hasValue: true,
  value,
  hasError: false,
  error: undefined,
});

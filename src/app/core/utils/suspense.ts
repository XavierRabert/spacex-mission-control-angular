import { catchError, map, Observable, of, startWith } from 'rxjs';

export interface Suspense<T> {
  isLoading: boolean;
  hasValue: boolean;
  value: T | null;
  hasError: boolean;
  error: any;
}

export function createSuspense<T>(obs$: Observable<T>): Observable<Suspense<T>> {
  return obs$.pipe(
    map((data) => ({
      isLoading: false,
      hasValue: true,
      value: data,
      hasError: false,
      error: null,
    })),
    startWith({
      isLoading: true,
      hasValue: false,
      value: null,
      hasError: false,
      error: null,
    }),
    catchError((err) =>
      of({
        isLoading: false,
        hasValue: false,
        value: null,
        hasError: true,
        error: err,
      }),
    ),
  );
}

export const getSuspensifyInitialValues = <T>(value: T) => ({
  isLoading: true,
  hasValue: true,
  value,
  hasError: false,
  error: undefined,
});

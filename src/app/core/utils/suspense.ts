import { catchError, map, Observable, of, startWith } from 'rxjs';

export interface Suspense<T> {
  pending: boolean;
  hasValue: boolean;
  hasError: boolean;
  value: T | undefined;
  error: any;
}

export function createSuspense<T>(obs$: Observable<T>): Observable<Suspense<T>> {
  return obs$.pipe(
    map((data) => ({
      pending: false,
      hasValue: true,
      hasError: false,
      value: data,
      error: null,
    })),
    startWith({
      pending: true,
      hasValue: false,
      hasError: false,
      value: undefined,
      error: null,
    }),
    catchError((err) =>
      of({
        pending: false,
        hasValue: false,
        hasError: true,
        value: undefined,
        error: err,
      }),
    ),
  );
}

export const getSuspensifyInitialValues = <T>(value: T) => ({
  pending: true,
  hasValue: true,
  hasError: false,
  value,
  error: undefined,
});

import { HttpErrorResponse } from '@angular/common/http';
import { TimeoutError, catchError, map, Observable, of, startWith, timeout } from 'rxjs';

export interface Suspense<T> {
  pending: boolean;
  hasValue: boolean;
  hasError: boolean;
  value: T | undefined;
  error: Error | null;
}

function getFriendlyApiError(error: unknown): Error {
  if (error instanceof TimeoutError) {
    return new Error('The request took too long. Please try again in a moment.');
  }

  if (error instanceof HttpErrorResponse) {
    if (error.status === 0) {
      return new Error('Unable to reach Launch Library 2. Check your connection and try again.');
    }
    if (error.status === 429) {
      return new Error('Launch Library 2 is temporarily rate-limiting requests. Please wait a little and try again.');
    }
    if (error.status >= 500) {
      return new Error('Launch Library 2 is temporarily unavailable. Please try again later.');
    }
    if (error.status === 404) {
      return new Error('The requested spaceflight data could not be found.');
    }
    return new Error(`Launch Library 2 returned an error (HTTP ${error.status}). Please try again.`);
  }

  if (error instanceof Error) return error;
  return new Error('Something went wrong while loading spaceflight data. Please try again.');
}

export function createSuspense<T>(obs$: Observable<T>): Observable<Suspense<T>> {
  return obs$.pipe(
    timeout({ first: 15000 }),
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
        error: getFriendlyApiError(err),
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

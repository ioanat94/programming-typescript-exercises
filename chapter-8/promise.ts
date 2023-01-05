type Executor<T> = (
  resolve: (result: T) => void,
  reject: (error: unknown) => void
) => void;

class CustomPromise<T> {
  constructor(f: Executor<T>) {}

  then<U>(g: (result: T) => CustomPromise<U>): CustomPromise<U> {}

  catch<U>(g: (error: unknown) => CustomPromise<U>): CustomPromise<U> {}
}

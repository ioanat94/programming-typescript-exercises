interface CustomOption<T> {
  flatMap<U>(f: (value: T) => None): None;
  flatMap<U>(f: (value: T) => CustomOption<U>): CustomOption<U>;
  getOrElse(value: T): T;
}

class Some<T> implements CustomOption<T> {
  constructor(private value: T) {}

  flatMap<U>(f: (value: T) => None): None;

  flatMap<U>(f: (value: T) => Some<U>): Some<U>;

  flatMap<U>(f: (value: T) => CustomOption<U>): CustomOption<U> {
    return f(this.value);
  }

  getOrElse(): T {
    return this.value;
  }
}

class None implements CustomOption<never> {
  flatMap(): None {
    return this;
  }

  getOrElse<U>(value: U): U {
    return value;
  }
}

function CustomOption<T>(value: null | undefined): None;
function CustomOption<T>(value: T): Some<T>;
function CustomOption<T>(value: T): CustomOption<T> {
  if (value == null) {
    return new None();
  }

  return new Some(value);
}

// let test = CustomOption(6).flatMap(n => CustomOption(n * 3)). flatMap(n => new None).getOrElse(7)

function ask() {
  let result = prompt('When is your birthday?');

  if (result === null) {
    return [];
  }

  return [result];
}

function parse(birthday: string): Date[] {
  let date = new Date(birthday);

  if (!isValid(date)) {
    return [];
  }

  return [date];
}

function isValid(date: Date) {
  return (
    Object.prototype.toString.call(date) === '[object Date]' &&
    !Number.isNaN(date.getTime())
  );
}

function flatten<T>(array: T[][]): T[] {
  return Array.prototype.concat.apply([], array);
}

ask()
  .flatMap(parse)
  .flatMap((date) => new Some(date.toISOString()))
  .flatMap((date) => new Some('Date is ' + date))
  .getOrElse('Error parsing date for some reason');

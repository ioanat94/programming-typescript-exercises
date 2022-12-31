// 1. Which parts of a function’s type signature does TypeScript infer: the parameters, the return type, or both?

// Return types are always inferred, parameter types are only sometimes inferred.

// 2. Is JavaScript’s arguments object typesafe? If not, what can you use instead?

// It is not typesafe. You should use ...rest instead.

// 3. You want the ability to book a vacation that starts immediately. Update the overloaded reserve function from earlier in this chapter (“Overloaded Function Types”) with a third call signature that takes just a destination, without an explicit start date. Update reserve’s implementation to support this new overloaded signature.

type Reservation = unknown;

type Reserve = {
  (from: Date, to: Date, destination: string): Reservation;
  (from: Date, destination: string): Reservation;
  (destination: string): Reservation;
};

let reserve: Reserve = (
  fromOrDestination: Date | string,
  toOrDestination?: Date | string,
  destination?: string
) => {
  if (typeof fromOrDestination === 'string') {
    // Book without dates
  } else if (toOrDestination instanceof Date && destination !== undefined) {
    // Book a one-way trip
  } else if (typeof toOrDestination === 'string') {
    // Book a round trip
  }
};

// 4. [Hard] Update our call implementation from earlier in the chapter (“Using bounded polymorphism to model arity”) to only work for functions whose second argument is a string. For all other functions, your implementation should fail at compile time.

function call<T extends [unknown, string, ...unknown[]], R>(
  f: (...args: T) => R,
  ...args: T
): R {
  return f(...args);
}

// 5. Implement a small typesafe assertion library, is. Start by sketching out your types. When you’re done, you should be able to use it like this:

// Compare a string and a string
// is('string', 'otherstring') // false

// Compare a boolean and a boolean
// is(true, false) // false

// Compare a number and a number
// is(42, 42) // true

// Comparing two different types should give a compile-time error
// is(10, 'foo') // Error TS2345: Argument of type '"foo"' is not assignable to parameter of type 'number'.

// [Hard] I should be able to pass any number of arguments
// is([1], [1, 2], [1, 2, 3]) // false

function is<T>(a: T, ...b: [T, ...T[]]): boolean {
  return b.every((val) => val === a);
}

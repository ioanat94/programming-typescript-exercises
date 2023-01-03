// 1. For each of the following pairs of types, decide if the first type is
// assignable to the second type, and why or why not. Think about
// these in terms of subtyping and variance, and refer to the rules at
// the start of the chapter if you’re unsure (if you’re still unsure, just
// type it into your code editor to check!):

// a. 1 and number

let test1: number;
test1 = 1 as 1;

// Works because 1 is a subtype of number

// b. number and 1

let test2: 1;
test2 = 1 as number;

// Doesn't work because number is not a subtype of 1

// c. string and number | string

let test3: number | string;
test3 = 'test' as string;

// Works because string is a subtype of number | string

// d. boolean and number

let test4: number;
test4 = true as boolean;

// Doesn't work because boolean is not a subtype of number

// e. number[] and (number | string)[]

let test5: (number | string)[];
test5 = [1, 2, 3] as number[];

// Works because number[] is a subtype of (number | string)[]

// f. (number | string)[] and number[]

let test6: number[];
test6 = [1, 2, 3] as (number | string)[];

// Doesn't work because (number | string)[] is not a subtype of number[]

// g. {a: true} and {a: boolean}

let test7: { a: boolean };
test7 = { a: true } as { a: true };

// Works because true is a subtype of boolean

// h. {a: {b: [string]}} and {a: {b: [number | string]}}

let test8: { a: { b: [number | string] } };
test8 = { a: { b: ['test'] } } as { a: { b: [string] } };

// Works because string[] is a subtype of [number | string]

// i. (a: number) => string and (b: number) => string

let test9: (a: number) => string;
test9 = ((b: number) => 'c') as (b: number) => string;

// Works because all types are assignable to each other (number -> number, string -> string)

// j. (a: number) => string and (a: string) => string

let test10: (a: string) => string;
test10 = ((a: number) => 'b') as (a: number) => string;

// Doesn't work because string is not assignable to number

// k. (a: number | string) => string and (a: string) => string

let test11: (a: string) => string;
test11 = ((a: number | string) => 'b') as (a: number | string) => string;

// Works because string is a subtype of number | string

// l. E.X (defined in an enum enum E {X = 'X'}) and F.X (defined in an enum enum F {X = 'X'})

enum E {
  X = 'X',
}

enum F {
  X = 'X',
}

let test12: F.X;
test12 = E.X as E.X;

// Doesn't work because E and F are different enums

// 2. If you have an object type type O = {a: {b: {c: string}}},
// what’s the type of keyof O? What about O['a']['b']?

// keyof O = 'a'
// keyof O['a']['b'] = { c: string }

// 3. Write an Exclusive<T, U> type that computes the types that are
// in either T or U, but not both. For example, Exclusive<1 | 2 |
// 3, 2 | 3 | 4> should resolve to 1 | 4. Write out step by step
// how the typechecker evaluates Exclusive<1 | 2, 2 | 4>.

type Exclusive<T, U> = Exclude<T, U> | Exclude<U, T>;

// 1. type example = Exclusive<1 | 2, 2 | 4>
// 2. example = Exclude<1 | 2, 2 | 4> | Exclude<2 | 4, 1 | 2>
// 3. example = (1 | 2 extends 2 | 4 ? never : 1 | 2) | (2 | 4 extends 1 | 2 ? never : 2 | 4)
// 4. example = (1 extends 2 | 4 ? never : 1) | (2 extends 2 | 4 ? never : 2) | (2 extends 1 | 2 ? never : 2) | (4 extends 1 | 2 ? never : 4)
// 5. example = 1 | never | never | 4
// 6. example =  1 | 4

// 4. Rewrite the example (from “Definite Assignment Assertions”) to
// avoid the definite assignment assertion.

let globalCache = {
  get(key: string) {
    return 'user';
  },
};

let userId = fetchUser();
userId.toUpperCase();

function fetchUser() {
  return globalCache.get('userId');
}

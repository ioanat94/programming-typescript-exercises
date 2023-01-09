// 1. Play around with declaration merging, to:
//    a. Reimplement companion objects (from “Companion
//      Object Pattern”) using namespaces and interfaces, instead
//      of values and types.
//    b. Add static methods to an enum.

interface Currency {
  unit: 'EUR' | 'USD' | 'GBP' | 'JPY';
  value: number;
}

namespace Currency {
  export let DEFAULT: Currency['unit'] = 'EUR';
  export function from(value: number, unit = Currency.DEFAULT): Currency {
    return { unit, value };
  }
}

let amountDue: Currency = {
  unit: 'GBP',
  value: 1456.14,
};

let otherAmountDue = Currency.from(330, 'USD');

// ------------------------------

enum Color {
  RED = '#ff0000',
  GREEN = '#00ff00',
  BLUE = '#0000ff',
}

namespace Color {
  export function getClosest(to: string): Color {}
}

Color.getClosest('#bada55');

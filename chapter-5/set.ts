class SimpleSet {
  has(value: number): boolean {
    // ...
    return true;
  }

  add(value: number): this {
    // ...
    return this;
  }
}

class MutableSet extends SimpleSet {
  delete(value: number): boolean {
    // ...
    return true;
  }
}

let set = new SimpleSet();
set.add(1).add(2).add(3);
set.has(2);
set.has(4);

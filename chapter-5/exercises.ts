// 1. What are the differences between a class and an interface?

// Interface:
//   - does not have implementations, visibility modifiers etc.
//   - does not generate JS code

// Class:
//   - has implementations, visibility modifiers etc.
//   - generates JS code
//   - defines both type and value

// 2. When you mark a class’s constructor as private, that means you
// can’t instantiate or extend the class. What happens when you mark
// it as protected instead? Play around with this in your code editor,
// and see if you can figure it out.

class Private {
  private constructor() {}
}

class Test1 extends Private {} // error
new Test2(); // error
new Private(); // error

class Protected {
  protected constructor() {}
}

class Test2 extends Protected {}
new Test(); // error
new Protected(); // error

// 3. Extend the implementation we developed “Factory Pattern” to
// make it safer, at the expense of breaking the abstraction a bit.
// Update the implementation so that a consumer knows at compile
// time that calling Shoe.create('boot') returns a Boot and calling
// Shoe.create('balletFlat') returns a BalletFlat (rather than
// both returning a Shoe). Hint: think back to “Overloaded Function
// Types”.

type Shoe1 = {
  purpose: string;
};

type ShoeFactory = {
  create(type: 'balletFlat'): BalletFlat1;
  create(type: 'boot'): Boot1;
  create(type: 'sneaker'): Sneaker1;
};

class BalletFlat1 implements Shoe1 {
  purpose = 'dancing';
}

class Boot1 implements Shoe1 {
  purpose = 'woodcutting';
}

class Sneaker1 implements Shoe1 {
  purpose = 'walking';
}

let Shoe1: ShoeFactory = {
  create(type: 'balletFlat' | 'boot' | 'sneaker'): Shoe1 {
    switch (type) {
      case 'balletFlat':
        return new BalletFlat1();
      case 'boot':
        return new Boot1();
      case 'sneaker':
        return new Sneaker1();
    }
  },
};

// 4. [Hard] As an exercise, think about how you might design a
// typesafe builder pattern. Extend the Builder pattern “Builder
// Pattern” to:
//   a. Guarantee at compile time that someone can’t call .send
//     before setting at least a URL and a method. Would it be
//     easier to make this guarantee if you also force the user to
//     call methods in a specific order? (Hint: what can you
//     return instead of this?)

class RequestBuilder1 {
  protected data: object | null = null;
  protected method: 'get' | 'post' | null = null;
  protected url: string | null = null;

  setMethod(method: 'get' | 'post'): RequestBuilderWithMethod {
    return new RequestBuilderWithMethod().setMethod(method).setData(this.data);
  }

  setData(data: object): this {
    this.data = data;
    return this;
  }
}

class RequestBuilderWithMethod extends RequestBuilder1 {
  setMethod(method: 'get' | 'post' | null): this {
    this.method = method;
    return this;
  }
  setURL(url: string): RequestBuilderWithMethodAndURL {
    return new RequestBuilderWithMethodAndURL()
      .setMethod(this.method)
      .setURL(url)
      .setData(this.data);
  }
}

class RequestBuilderWithMethodAndURL extends RequestBuilderWithMethod {
  setURL(url: string): this {
    this.url = url;
    return this;
  }
  send() {
    // ...
  }
}

//   b. [Harder] How would you change your design if you
//     wanted to make this guarantee, but still let people call
//     methods in any order? (Hint: what TypeScript feature can
//     you use to make each method’s return type “add” to the
//     this type after each method call?)

interface ReqBuilder {
  data?: object;
  method: 'get' | 'post';
  url: string;
}

class ReqBuilderClass {
  data?: object;
  method?: 'get' | 'post';
  url?: string;

  setData(data: object): this & Pick<ReqBuilder, 'data'> {
    return Object.assign(this, { data });
  }

  setMethod(method: 'get' | 'post'): this & Pick<ReqBuilder, 'method'> {
    return Object.assign(this, { method });
  }

  setURL(url: string): this & Pick<ReqBuilder, 'url'> {
    return Object.assign(this, { url });
  }

  build(this: ReqBuilder) {
    return this;
  }
}

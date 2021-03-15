const go = (...args) => args.reduce((acc, f) => f(acc));
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);
const curry = (f) => (a, ...rest) =>
  rest.length > 0 ? f(a, ...rest) : (...rest) => f(a, ...rest);
const map = curry((fn, functor) => {
  return functor.map(fn);
});

const books = [
  {
    id: "book1",
    title: "coding with javascript",
    author: "Chris Minnick, Eva Holland",
  },
  { id: "book2", title: "speaking javaScript", author: "Axel Rauschmayer" },
];

/**
 * Maybe 구현 및 이용
 */

class Maybe {
  constructor(value) {
    this.$value = value;
  }
  static of(value) {
    return new Maybe(value);
  }
  get isNothing() {
    return this.$value === null || this.$value === undefined;
  }
  map(fn) {
    return this.isNothing ? this : Maybe.of(fn(this.$value));
  }
  toString() {
    return this.isNothing ? "Nothing" : `Just(${this.$value})`;
  }
}

const startCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const findBookById = curry((id, books) => {
  return books.find((book) => book.id === id);
});

const prop = curry((propName, obj) => {
  return obj[propName];
});

const getUpperBookTitleById = (id, books) => {
  return pipe(
    Maybe.of,
    map(findBookById(id)),
    map(prop("title")),
    map(startCase)
  )(books);
};

// console.log(getUpperBookTitleById("book1", books).toString()); // Just("Coding with javascript")
// console.log(getUpperBookTitleById("book2", books).toString()); // Just("Speaking javaScript")
// console.log(getUpperBookTitleById("book3", books).toString()); // Nothing

/**
 * Either 구현 및 이용
 */

class Either {
  constructor(value) {
    this.$value = value;
  }

  static right(value) {
    // 제대로 일때
    return new Right(value);
  }

  static left(value) {
    // 에러 일때
    return new Left(value);
  }
}

class Right extends Either {
  get isRight() {
    return true;
  }

  get isLeft() {
    return false;
  }

  map(fn) {
    return new Right(fn(this.$value));
  }
}

class Left extends Either {
  get isRight() {
    return false;
  }

  get isLeft() {
    return true;
  }

  map(fn) {
    return this;
  }
}

const either = curry((l, r) => (e) => {
  return e.isLeft ? l(e.$value) : r(e.$value);
});

const logBookAuthor = (book) => {
  console.log(`Author: ${book.author}`);
};

const logErrorBookAuthor = (book) => {
  console.error(`Author: ${book.author}`);
};

const validateBookAuthor = (book) => {
  return book.author.indexOf("Axel") === -1
    ? Either.left(book)
    : Either.right(book);
};

const logBookAuthorPipe = (bookId, books) => {
  return pipe(
    findBookById(bookId),
    (book) => validateBookAuthor(book),
    either(logErrorBookAuthor, logBookAuthor)
  )(books);
};

logBookAuthorPipe("book1", books);
logBookAuthorPipe("book2", books);

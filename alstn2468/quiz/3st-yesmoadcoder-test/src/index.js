/*
  커스텀 promise 구현하기
*/

const PROMISE_STATUS = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const MyPromise = class {
  constructor(executor) {
    this.status = PROMISE_STATUS.PENDING;
    this.result = undefined;
    this.queue = [];
    try {
      executor(
        (value) => this.resolve(value),
        (value) => this.reject(value)
      );
    } catch (error) {
      this.reject(error);
    }
  }
  resolve(value) {
    if (this.status !== PROMISE_STATUS.PENDING) return this;
    this.status = PROMISE_STATUS.RESOLVED;
    this.result = value;
    this.queue.forEach((resolve) => resolve());
  }
  reject(error) {
    if (this.status !== PROMISE_STATUS.PENDING) return this;
    this.status = PROMISE_STATUS.REJECTED;
    this.result = error;
    this.queue.forEach((reject) => reject());
  }
  then(callback) {
    switch (this.status) {
      case PROMISE_STATUS.PENDING:
        return new MyPromise((resolve) => {
          this.queue.push(() => resolve(callback(this.result)));
        });
      case PROMISE_STATUS.RESOLVED:
        return new MyPromise((resolve) => resolve(callback(this.result)));
      case PROMISE_STATUS.REJECTED:
        break;
    }
    return this;
  }
  catch(callback) {
    switch (this.status) {
      case PROMISE_STATUS.PENDING:
        return new MyPromise((reject) => {
          this.queue.push(() => reject(callback(this.result)));
        });
      case PROMISE_STATUS.RESOLVED:
        break;
      case PROMISE_STATUS.REJECTED:
        return new MyPromise((reject) => reject(callback(this.result)));
    }
    return this;
  }
};

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('첫번째 프로미스');
  }, 1000);
})
  .then((value) => {
    console.log(value);
    return '두번째 프로미스';
  })
  .then((value) => {
    console.log(value);
    throw '이건 에러야';
  })
  .catch((e) => {
    console.log(e);
  });

// 출력
// 첫번째 프로미스
// 두번째 프로미스
// 이건 에러야

/*
  커스텀 이터러블 이터레이터 구현하기
*/

const iterable = {
  [Symbol.iterator]() {
    let i = 1;
    return {
      next() {
        return i > 5
          ? { value: undefined, done: true }
          : { value: i++, done: false };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  },
};

let iterator = iterable[Symbol.iterator]();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }

for (const a of iterator) console.log(a); // 3 4 5
for (const a of iterable) console.log(a); // 1 2 3 4 5

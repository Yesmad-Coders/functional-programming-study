const MyPromise = class {
  constructor(executor) {
    try {
      executor();
    } catch (error) {
      this.rejsect(error);
    }
  }
  resolve(value) {}
  then(callback) {}
  catch(callback) {}
};

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("첫번째 프로미스");
  }, 1000);
})
  .then((value) => {
    console.log(value);
    return "두번째 프로미스";
  })
  .then((value) => {
    console.log(value);
    throw "이건 에러야";
  })
  .catch((e) => {
    console.log(e);
  });

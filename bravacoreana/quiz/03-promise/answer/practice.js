const log = console.log;

// const pending = new Promise((resolve) => {});
// log(pending); //Promise { <pending> }

// const fulfilled = new Promise((resolve) => resolve("fulfilled"));
// log(fulfilled); // Promise { 'fulfilled' }

// const rejected = new Promise((resolve, reject) => {
//   throw new Error("rejected!");
//   reject();
// });
// log(rejected); //   <rejected> Error: rejected!

const promise = new Promise(() => {});
log(promise);

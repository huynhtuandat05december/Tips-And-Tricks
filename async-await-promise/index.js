const promise1 = () => {
  return new Promise((resolved, reject) => {
    setTimeout(() => {
      resolved(1);
    }, 3000);
  });
};

const promise2 = () => {
  return new Promise((resolved, reject) => {
    setTimeout(() => {
      resolved(2);
    }, 2000);
  });
};

async function test() {
  //5s
  console.time("TIME-PROCESS");
  const result1 = await promise1();
  const result2 = await promise2();
  console.timeEnd("TIME-PROCESS");
  return result1 + result2;
}

async function test2() {
  //3s
  console.time("TIME-PROCESS");
  const result1 = promise1();
  const result2 = promise2();
  const value1 = await result1;
  const value2 = await result2;
  console.timeEnd("TIME-PROCESS");
  return value1 + value2;
}

async function test3() {
  //3s
  console.time("TIME-PROCESS");
  const result = await Promise.all([promise1(), promise2()]);
  console.timeEnd("TIME-PROCESS");
  return result;
}
// test2().then((total) => console.log(total));

const newFunction = async () => {
  // Way 1:
  //   return await promise1();
  // Way 2:
  //   const result = await promise1();
  //   return result;
};
//async function luôn trả về 1 promise
// console.log(newFunction());

## async/await

### async/await

- 프로미스를 기반으로 동작한다.
- 프로미스의 then/catch/finally 후속 처리 메서드에 콜백 함수를 전달해서 비동기 처리 결과를 후속 처리할 필요 없이 마치 동기 처리 처럼 프로미스를 사용할 수 있다.

### async 함수

```jsx
/* function startAsync(age) {
  return new Promise((resolve, reject) => {
    if (age > 20) resolve(`${age} success`);
    else reject(new Error(`${age} is not over 20`));
  });
} */

async function startAsync(age) {
  if (age > 20) return `${age} success`;
  else throw new Error(`${age} is not over 20`);
}

const promise1 = startAsync(25);
promise1
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.error(error);
  });

const promise2 = startAsync(15);
promise2
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.error(error);
  });

// 25 success
// Error: 15 is not over 20
```

- async 함수는 언제나 프로미스를 반환한다.
- 명시적으로 프로미스를 반환하지 않더라도 암묵적으로 반환값을 resolve하는 프로미스를 반환한다.
- 모든 비동기 동작을 async 함수로 만들 수 있는 건 아니다. (e.g. setTimeout)

### await 키워드

```jsx
function setTimeoutPromise(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

async function startAsync(age) {
  if (age > 20) return `${age} success`;
  else throw new Error(`${age} is not over 20`);
}

async function startAsyncJobs() {
  await setTimeoutPromise(1000);
  const promise1 = startAsync(25);

  try {
    const value = await promise1;
    console.log(value);
  } catch (e) {
    console.error(e);
  }

  const promise2 = startAsync(15);

  try {
    const value = await promise2;
    console.log(value);
  } catch (e) {
    console.error(e);
  }
}

startAsyncJobs();

// 25 success
// Error: 15 is not over 20
```

- await는 반드시 async 함수 내부에서 사용해야 된다.
- await 키워드는 프로미스가 비동기 처리가 수행된 상태가 될 때까지 대기하다가 비동기 처리가 수행되면 프로미스가 resolve한 처리 결과를 반환한다.
- 프로미스에서 reject가 발생한다면 예외가 발생한다. 예외 처리로 try-catch를 사용할 수 있다.

### 참고

- https://springfall.cc/post/7
- [https://inpa.tistory.com/entry/JS-📚-비동기처리-async-await#async_/_await_기본_사용법](https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EB%B9%84%EB%8F%99%EA%B8%B0%EC%B2%98%EB%A6%AC-async-await#async_/_await_%EA%B8%B0%EB%B3%B8_%EC%82%AC%EC%9A%A9%EB%B2%95)
- 자바스크립트 딥다이브 46장

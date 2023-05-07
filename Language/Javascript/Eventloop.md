# Event Loop

## Intro

Event Loop를 이해하기 전, 먼저 Javascript의 [동기/비동기]()에 대해 알아야 한다. 동기란 데이터의 요청과 결과가 한 자리에서 동시에 일어나는 것을 의미한다. 요청을 하면 시간이 얼마나 걸리던지 요청한 자리에서 결과가 주어져야 한다. 반면에 비동기는 동시에 일어나지 않는 것을 의미한다. 하나의 요청에 따른 응답을 즉시 처리하지 않아도, 그 대기 시간동안 또 다른 요청에 대해 처리 가능한 방식이다. JS는 동기 동작을 JS엔진의 'Call Stack'을 통해 지원하고, 비동기 동작을 브라우저의 'Web APIs'를 통해 지원한다.

## JS언어의 비동기 동작

JS언어 자체가 비동기 동작을 지원하지 않는다. 비동기로 동작하는 핵심요소는 JS언어가 아니라 브라우저가 가지고 있다. (Node에서는 [libuv 라이브러리](https://sjh836.tistory.com/99) 등) 브라우저는 Web APIs, Event Table, Callback Queue, Event Loop 등으로 구성된다.

<img src='https://miro.medium.com/v2/resize:fit:720/format:webp/1*pjRSYsfW-D8MCrGh9LS_4Q.png' width='400' />

- Heap : 메모리 할당이 발생하는 곳
- Call Stack : 실행된 코드의 환경을 저장하는 자료구조, 함수 호출 시 Call Stack에 push됨
- Web APIS : DOM, AJAX, setTimeout 등 브라우저가 제공하는 API
- Callback Queue : Web APIS에서 비동기로 실행된 콜백함수들이 대기하는 곳
- `Event Loop : Call Stack이 비어있으면 Callback Queue에서 콜백함수를 Call Stack으로 이동시키는 역할`

### 예시 1

```js
console.log("first");

setTimeout(function cb() {
  console.log("second");
}, 1000); // 0ms 뒤 실행

console.log("third");
```

1. console.log('first')가 call stack에 push
2. console.log('first')가 실행되어 화면에 출력 -> call stack에서 제거
3. setTimeout(function cb(){...})이 call stack에 push
4. setTimeout(function cb(){...})이 실행되어 Web APIs로 이동 -> call stack에서 제거
5. console.log('third')가 call stack에 push
6. console.log('third')가 실행되어 화면에 출력 -> call stack에서 제거
7. Web APIs에서 0ms 시간이 지난 뒤 callback으로 전달한 cb함수가 callback queue(task queue)에 추가
8. Event loop는 call stack이 비어있음을 확인하고 callback queue를 살펴봄 -> cb를 발견한 Event Loop는 call stack에 cb추가
9. cb가 실행 -> 내부의 console.log('second')가 call stack에 추가
10. console.log('second')가 실행되어 화면에 출력 -> call stack에서 제거
11. cb가 call stack에서 제거

### 예시 2

```js
console.log("first");
setTimeout(function cb() {
  console.log("second");
}, 0);
wait3Seconds();
console.log("third");

function wait3Seconds() {
  let start = Date.now(),
    now = start;
  while (now - start < 3 * 1000) {
    now = Date.now();
  }
  console.log("fourth");
}
```

1. console.log('first')가 call stack에 push
2. console.log('first')가 실행되어 화면에 출력 -> call stack에서 제거
3. setTimeout(function cb(){...})이 call stack에 push
4. setTimeout(function cb(){...})이 실행되어 Web APIs로 이동 -> call stack에서 제거
5. Web APIs에서 0ms 시간이 지난 뒤 callback으로 전달한 cb함수가 callback queue(task queue)에 추가
6. wait3Seconds()가 call stack에 push

- Event Loop는 call stack이 비어있지 않기 때문에 callback queue를 살펴보지 않음

7. wait3Seconds()가 실행되어 3초간 무한루프를 돌게 됨
8. 무한로프가 끝나면 console.log('fourth')가 call stack에 push
9. console.log('fourth')가 실행되어 화면에 출력 -> call stack에서 제거
10. wait3Seconds()가 call stack에서 제거
11. console.log('third')가 call stack에 push
12. console.log('third')가 실행되어 화면에 출력 -> call stack에서 제거
13. Event Loop는 call stack이 비어있음을 확인하고 callback queue를 살펴봄 -> cb를 발견한 Event Loop는 call stack에 cb추가
14. cb가 실행 -> 내부의 console.log('second')가 call stack에 추가
15. console.log('second')가 실행되어 화면에 출력 -> call stack에서 제거
    > setTimeout의 delay인자가 `delayms후에 실행되는 것`을 보장하지는 않는다. 정확히는 `delayms후에 callback queue에 들어가는 것`을 보장

### 출처

[동기 비동기의 개념과 차이](https://dev-coco.tistory.com/46)

[JavaScript 비동기 핵심 Event Loop 정리](https://medium.com/sjk5766/javascript-%EB%B9%84%EB%8F%99%EA%B8%B0-%ED%95%B5%EC%8B%AC-event-loop-%EC%A0%95%EB%A6%AC-422eb29231a8)

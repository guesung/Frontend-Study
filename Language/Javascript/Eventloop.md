# Event Loop

## Intro

Event Loop를 이해하기 전, 먼저 Javascript의 [동기/비동기]()에 대해 알아야 한다. 동기란 데이터의 요청과 결과가 한 자리에서 동시에 일어나는 것을 의미한다. 요청을 하면 시간이 얼마나 걸리던지 요청한 자리에서 결과가 주어져야 한다. 반면에 비동기는 동시에 일어나지 않는 것을 의미한다. 하나의 요청에 따른 응답을 즉시 처리하지 않아도, 그 대기 시간동안 또 다른 요청에 대해 처리 가능한 방식이다. JS는 동기 동작을 JS엔진의 'Call Stack'을 통해 지원하고, 비동기 동작을 브라우저의 'Web APIs'를 통해 지원한다.

## JS언어의 비동기 동작

JS언어 자체가 비동기 동작을 지원하지 않는다. 비동기로 동작하는 핵심요소는 JS언어가 아니라 브라우저가 가지고 있다. (Node에서는 [libuv 라이브러리](https://sjh836.tistory.com/99) 등) 브라우저는 Web APIs, Event Table, Callback Queue, Event Loop 등으로 구성된다.

<img src='https://miro.medium.com/v2/resize:fit:720/format:webp/1*pjRSYsfW-D8MCrGh9LS_4Q.png' width='400' />

- Heap : 메모리 할당이 발생하는 곳
- Call Stack : 실행된 코드의 환경을 저장하는 자료구조, 함수 호출 시 Call Stack에 push됨
- Web APIS : DOM, AJAX, setTimeout 등 `웹 브라우저가 제공하는 API`
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
5. Web APIs에서 0ms 시간이 지난 뒤 callback으로 전달한 cb함수가 callback queue(task queue)에 추가
6. console.log('third')가 call stack에 push
7. console.log('third')가 실행되어 화면에 출력 -> call stack에서 제거
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

> setTimeout의 delay인자가 `delayms후에 실행되는 것`을 보장하지는 않는다. 정확히는 `delayms후에 callback queue에 들어가는 것`을 보장한다.
> wait3Seconds함수의 while문은 비동기 함수가 아니기 때문에 callback queue에 들어가지 않는다. 따라서 while문이 끝나기 전까지는 callstack에 다른 함수가 들어갈 수 없기에 다음 코드가 실행되지 않는다.
> wait3Seconds()함수는 함수 선언식이기 때문에 선언이 호이스팅되어 위 코드에서 정상적으로 동작한다. `const wait3Seconds = () => {}`처럼 함수 표현식으로 선언하면 reference error가 발생한다.

## [JavaScript 비동기 핵심 Event Loop 정리](https://medium.com/sjk5766/javascript-%EB%B9%84%EB%8F%99%EA%B8%B0-%ED%95%B5%EC%8B%AC-event-loop-%EC%A0%95%EB%A6%AC-422eb29231a8)

---

## Q&A

### 1. 브라우저와 Node.js?

#### Node.js와 브라우저의 차이

- Node.js와 브라우저 둘 다 JS엔진을 내장하고 있기 때문에, JS라는 프로그래밍 언어를 기반으로 실행
- 브라우저 : HTML, CSS, JS를 실행하여 웹 페이지를 화면에 띄어주는게 목적
  - DOM API 제공
  - window/document 객체에 접근
  - 업그레이드가 뒤처질 때가 종종 있음 -> Node.js와 버전 차이 : Bable이라는 JS컴파일러를 통해 해결
  - ES 모듈 표준 사용 -> import를 통해 다른 파일의 코드 불러옴
  - [브라우저 API(web API)](https://developer.mozilla.org/ko/docs/Web/API)
  - e.g. `Console API`,`DOM API`,`Fetch API`
- Node.js : 서버 개발 환경을 제공하는 것이 목적
  - File 시스템 관련 API 제공. DOM이 없음 -> window/document 객체에 접근 불가
  - 브라우저보다 컴퓨터의 깊숙한 곳까지 제어
  - 어떤 버전의 Node.js버전을 사용할 것인지 사용자가 선택
  - CommonJS 모듈 시스템 사용 -> require()를 통해 다른 파일의 코드 불러옴
  - [Node.js API](https://nodejs.org/docs/latest/api/)
  - e.g. `console`,`Timers`,`File system`
- 예시를 보면 브라우저, Node.js 모두 console API를 가지고 있음 -> 서버 개발 환경과 브라우저 환경에서 모두 사용 가능함을 알 수 있음

#### JS엔진의 차이

- Node.js와 크롬 브라우저 : V8엔진을 사용
- FireFox : SpiderMonkey엔진 사용
- Edge : V8 + Chakra(이전 버전)에ㄴ진 사용

### Node.js

- Chrome V8 JS엔진으로 빌드 된 JS 런타임
  ###### 런타임 : 특정 언어로 만든 프로그램을 실행할 수 있는 환경
  - 즉, 노드는 JS프로그램을 컴퓨터에서 실행할 수 있게 하는 JS 실행기
- 다양한 JS 애플리케이션을 실행할 수 있으며, 서버를 실행하는 데 제일 많이 사용
- V8과 함께 libuv라는 라이브러리 사용
  - libuv 라이브러리 : 노드의 특성인 이벤트 기반, 논 블로킹 I/O모델 구현
    - 이벤트 기반 : 이벤트가 발생할 때 미리 지정해둔 작업을 수행하는 방식
    - 논블로킹 I/O : 이전 작업이 완료될 때까지 멈추지 않고 다음 작업 수행. 즉 비동기 방식

### 2. Web API란?

- `Ajax` 요청, `setTimeout()`, 이벤트 핸들러의 등록과 같이 웹 브라우저에서 제공하는 기능
- JS엔진의 쓰레드와 다른 쓰레드에서 이뤄짐
- JavaScript 엔진의 call stack에서 실행된 비동기 함수가 요청하는 **비동기 작업**에 대한 정보와 **콜백 함수**를 `웹 API를 통해 브라우저에게 넘기면`, 브라우저는 이러한 요청들을 별도의 쓰레드에 위임
- 그러면 그 쓰레드는 해당 요청이 완료되는 순간 전달받았던 콜백 함수를 JavaScript 엔진의 Task Queue에 집어넣는다.
- e.g. setTimeout()함수 실행
  1. JS엔진은 Web API를 통해 브라우저에게 setTimeout() 작업을 요청하면서 callback 함수를 전달
     - JS엔진의 call stack에서는 setTimeout()함수를 즉시 pop
  2. 브라우저는 이러한 타이머 작업을 별도의 스레드에게 위임
  3. 인자로 전달된 시간이 흐르고 나면 해당 타이머 작업을 처리하고 있던 스레드는 전달받았던 callback 함수를 JS엔진의 Task Queue에 집어넣는다.

### 3. Task Queue와 Event Loop는 어디에 있는 것인가요 ?

- Task Queue : JS 엔진에 자체에 포함되어 있음
  - Task Queue는 웹 API를 처리하고 있던 스레드로부터 전달받은 callback 함수들을 저장하고 있는 큐
- Event Loop 또한 JS 엔진에 포함되어 있음
  - 매 순간 call stack이 비어있는지 여부와 태스크 큐에 콜백 함수가 기다리고 있는지 여부를 확인하는 역할을 수행

### 4. Task Queue 외에 MicroTask Queue, MacroTask Queue는 무엇인가요?

- Macrotask Queue : 우리가 기존에 알고 있던 Taskqueue
  - `setTimeout`, `setInterval`, `setImmediate`
- Microtask Queue :

  - `process.nextTick`, `Promise`, `async/await`, `Object.observe`, `MutationObserver`

  <img src='https://res.cloudinary.com/practicaldev/image/fetch/s--05Fi8vBq--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/42eatw03fcha0e1qcrf0.gif' width=400 />

#### 코드 예시

```js
// 1. 실행
console.log("script start");

// 2. task queue로 전달
setTimeout(function () {
  // 8. task 실행
  console.log("setTimeout");
}, 0);

// 3. microtask queue로 전달
Promise.resolve()
  .then(function () {
    // 5. microtask 실행
    console.log("promise1");
    // 6. microtask queue로 전달
  })
  .then(function () {
    // 7. microtask 실행
    console.log("promise2");
  });

// 4. 실행
console.log("script end");
```

- ###### 브라우저 환경에 따라 아래와 같은 결과가 나오지 않을 수도 있다. 이는 브라우저마다 비동기 작업을 처리하는 세부적인 구조가 다르기 때문인데, 이 글은 V8 엔진을 사용하는 Chrome 브라우저를 바탕으로 한 설명 글이다.

1. console.log("script start")는 call stack에 push -> 실행 -> pop
2. setTimeout은 call stack에 push -> 실행 : Web API를 통해 브라우저에게 setTimeout() 작업을 요청하며 callback 함수를 전달
   - 브라우저는 이러한 타이머 작업을 별도의 스레드에게 위임
   - 인자로 전달된 시간이 흐르고나면 해당 타이머 작업을 처리하고 있던 스레드는 전달받았던 callback 함수를 Task Queue(MacroTask Queue)에 집어넣음 -> Event Loop에 의해 call stack이 비어있을 때까지 기다림
3. Promise.resolve()는 call stack에 push -> 실행 : Promise.resolve()는 JS 엔진에 의해 즉시 실행되며, callback 함수는 Microtask Queue에 전달
4. console.log("script end")는 call stack에 push -> 실행 -> pop
5. Microtask Queue에 있는 callback 함수`(.then(function(){~1}))`가 call stack에 push -> 실행 -> pop
6. Microtask Queue에 있는 callback 함수`(.then(function(){~2}))`가 call stack에 push -> 실행 -> pop
7. Microtask Queue가 비어있으므로 Event Loop는 다시 Task Queue를 확인
8. Task Queue에 있는 callback 함수`(function(){~setTimeout})`가 call stack에 push -> 실행 -> pop

- 그림으로 이해 : [링크](https://velog.io/@titu/JavaScript-Task-Queue%EB%A7%90%EA%B3%A0-%EB%8B%A4%EB%A5%B8-%ED%81%90%EA%B0%80-%EB%8D%94-%EC%9E%88%EB%8B%A4%EA%B3%A0-MicroTask-Queue-Animation-Frames-Render-Queue)

- 결과
  ```
  script start
  script end
  promise1
  promise2
  setTimeout
  ```

### 5. async await는 Promise와 작동 방식이 다른가요?

### 출처

- [동기 비동기의 개념과 차이](https://dev-coco.tistory.com/46)
- [Node.js와 브라우저의 차이](https://velog.io/@gwanuuoo/node.js%EC%99%80-%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EC%9D%98-%EC%B0%A8%EC%9D%B4)
- [Node.js 개념 이해하기](https://hanamon.kr/nodejs-%EA%B0%9C%EB%85%90-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0/)
- [ask Queue말고 다른 큐가 더 있다고?(MicroTask Queue, Animation Frames)](https://velog.io/@titu/JavaScript-Task-Queue%EB%A7%90%EA%B3%A0-%EB%8B%A4%EB%A5%B8-%ED%81%90%EA%B0%80-%EB%8D%94-%EC%9E%88%EB%8B%A4%EA%B3%A0-MicroTask-Queue-Animation-Frames-Render-Queue)
- [애니메이션](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
- [비동기 작업의 원리 (JavaScript 엔진, Web API, Task Queue, Event Loop)](https://it-eldorado.tistory.com/86)

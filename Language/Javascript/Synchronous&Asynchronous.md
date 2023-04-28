# Synchronous&Asynchronous

## 1. 동기와 비동기

### 동기(Synchronous)

: 데이터의 요청과 결과가 한 자리에서 동시에 일어나는 것

- 요청을 하면 시간이 얼마나 걸리던지 요청한 자리에서 결과가 주어져야 함

### 비동기(Asynchronous)

: 동시에 일어나지 않는 것

- 요청한 결과는 동시에 일어나지 않을거라는 약속

## 2. Javascript와 동기, 비동기

Javascript(이하 JS)는 기본적으로 동기식 언어이다 : 한 작업이 실행되는 동안 다른 작업은 멈춘 상태를 유지하고 자신의 차례를 기다린다. 이러한 동작을 `단일 스레드(싱글 스레드)`, `동기`라고 부른다. JS의 동기 처리를 이해하려면 JS Engine을 들여다 봐야 한다. Javascript Engine은 `Memory Heap`과 `Call Stack`으로 구성되어 있다.

##### Javascript Engine 예시 : 크롬의 V8, 파이어폭스의 SpiderMonkey, 사파리의 JavaScriptCore, MS의 Chakra 등

### 2.1 동기 처리 - JS Engine : Memory Heap과 Call stack

1. Memory Heap : 변수와 객체의 메모리 할당을 담당하는 곳
2. Call Stack : 함수가 호출이 되면 쌓이는 곳

- [Stack](https://ko.wikipedia.org/wiki/%EC%8A%A4%ED%83%9D) : LIFO(Last In First Out) 구조로 마지막에 들어온 것이 먼저 나간다.

Call stack은 함수가 호출되면 쌓이고, 함수가 종료되면 제거된다. 이러한 Call stack의 특성 때문에 JS는 `단일 스레드`라고 불린다.

### 2.2 비동기 처리 - 실행 환경 : 이벤트 루프와 이벤트 큐

비동기 처리가 없고, 모든 동작을 동기 처리를 한다면 30초 이상 걸리는 동작을 수행하게 될 때 다른 모든 동작이 멈추어야 한다. 그렇다면, JS는 이러한 동작을 어떻게 비동기 처리로 수행할까? 그것은 바로 JS의 `실행환경`과 관련이 있다.
브라우저에서는 JS엔진(Memory Heap과 Call stack)만으로 동작하지 않는다. 브라우저에서의 JS실행환경(Runtime)에서는 비동기 처리를 위한 web API(DOM 조작, AJAX 등)를 제공한다. 또, 이를 제어하기 위해 `이벤트 루프(Event Loop)`, `이벤트 큐(Callback Queue 혹은 Task Queue)`가 존재한다.

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbMlLfs%2FbtqFQ9i1iD3%2FZQE2tqi7lx7LUhTwK1tDtK%2Fimg.png' width='500'/>

###### 출처 : https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf

### 정리

> 동기 동작 원리(JS Engine)
>
> 1. 코드가 실행되면 Call stack에 실행할 함수가 쌓인다(push)
> 2. 쌓인 반대 순서로 함수가 실행된다(LIFO)
> 3. 실행된 함수는 Call stack에서 제거된다(pop)

> 비동기 동작 원리([Event Loop](https://baeharam.netlify.app/posts/javascript/event-loop))
>
> 1. Call Stack에서 비동기 함수가 호출되면 Call stack에 먼저 쌓였다가 Web API로 이동한 후 해당 함수가 등록되고 Call stack에 제거된다.
> 2. Web API에서 비동기 함수의 이벤트가 발생하면, 해당 콜백은 Task Queue에 push된다.
> 3. Call stack이 비어있는지 Event Loop가 확인을 하는데 만약 비어있으면, Call stack에 Callback Queue에 있는 콜백 함수를 넘겨준다.
> 4. Call stack에 들어온 함수는 실행이 되고 실행이 끝나면 Call stack에서 사라진다.

### 출처

[동기와 비동기의 차이
](https://velog.io/@slobber/%EB%8F%99%EA%B8%B0%EC%99%80-%EB%B9%84%EB%8F%99%EA%B8%B0%EC%9D%98-%EC%B0%A8%EC%9D%B4)

[자바스크립트 - 동기(Synchronous)? 비동기(asynchronous)?](https://ljtaek2.tistory.com/142)

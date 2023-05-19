# Execution Context(실행 컨텍스트)

## 개념

- 실행 컨텍스트 : 실행할 코드에 제공할 환경 정보들을 모아놓은 객체
- 실행 컨텍스트가 활성화되는 시점에 다음과 같은 현상이 생김
  1. 호이스팅 발생
     ###### 호이스팅 : 선언된 변수를 최상단으로 끌어올림
  2. 외부 환경 정보 구성
  3. this 바인딩

## 실행 컨텍스트 구성

실행 컨텍스트는 다음과 같은 것들을 이용하면 call stack에 쌓임

1. 전역공간
   - 브라우저의 경우 window 객체, Node.js의 경우 global객체
2. `함수 실행`
3. eval() 함수 실행
4. block을 만든다.

### 예시

```js
var a = 1; // 전역 컨텍스트
function outer() {
  // outer 컨텍스트
  function inner() {
    // inner 컨텍스트
    console.log(a); // undefined
    var a = 3;
    console.log(a); // 3
  }
  inner();
  console.log(a); // 1
}
outer();
console.log(a); // 1
```

1. 프로그램 실행: [전역컨텍스트]
2. outer 실행: [전역컨텍스트, outer]
3. inner 실행: [전역컨텍스트, outer, inner]
4. inner 종료: [전역컨텍스트, outer]
5. outer 종료: [전역컨텍스트]

## 실행 컨텍스트를 구성할 때 생기는 것

1. Variable Environment : 현재 컨텍스트 내의 `식별자(변수)들에 대한 정보` + `외부 환경 정보`
   - 최초 실행 시의 스냅샷 유지
2. Lexical Environment(=어휘적 환경) : 처음에는 Variable Environment와 동일
   - 변경 사항이 실시간 반영
   1. environment Record : 현재 컨텍스트와 관련된 코드의 식별자 정보가 저장 e.g. 매개변수의 이름, 함수 선언, 변수명 등
   2. outerEnvironment Reference : 바깥에 있는 environment record를 참조 -> 스코프 체인을 구현
3. This Binding : 식별자가 바라봐야할 대상 객체

### 예시

```js
const str = "안녕";

function outer() {
  function inner() {
    const greeting = "하이";
    console.log(greeting);
    console.log(str);
  }
  inner();
}
outer();

console.log(str);
```

1. 시작: 전역 컨텍스트가 생성된다. 전역 컨텍스트의 environmentRecord에 { str, outer } 식별자를 저장한다. 전역 컨텍스트는 가장 최상위 컨텍스트이므로 outerEnvironmentReference는 null이다. (this: 전역객체)
2. 1, 3번째 줄: 전역 스코프에 있는 변수 str에 '안녕'을, outer에 함수를 할당한다.
3. 10번째 줄: outer 함수를 호출한다. 전역 컨텍스트의 코드는 10번째 줄에서 잠시 중단되고, outer 실행 컨텍스트가 활성화되어 3번째 줄로 이동한다.
4. 3번째 줄: outer 실행 컨텍스트의 environmentRecord에 { inner } 식별자를 저장한다. outerEnvironmentReference에는 outer 함수가 선언될 당시의 LexicalEnvironment가 담긴다(===전역 컨텍스트의 LexicalEnvironment).이를 { GLOBAL, { a, outer }}라고 표기하자. 첫 번째는 실행 컨텍스트의 이름, 두 번째는 environmentRecord 객체다. (this: 전역객체)
5. 4번째 줄: outer 스코프에 있는 변수 inner에 함수를 할당한다.
6. 8번째 줄: inner 함수를 호출한다. 여기서 outer 실행 컨텍스트의 코드는 임시 중단되고, inner 실행 컨텍스트가 활성화되어 4번째 줄로 이동한다.
7. 5번째 줄: inner 실행 컨텍스트의 environmentRecord에 { greeting } 식별자를 저장한다. outerEnvironmentReference엔 inner 함수가 선언될 당시의 LexicalEnvironment가 담긴다. inner함수는 outer함수에서 선언되었으므로 outer 함수의 LexicalEnvironment, 즉 { outer, { inner }}를 참조복사한다. (this: 전역객체)
8. 6번째 줄: environmentRecord에 있는 greeting을 찾아서 실행한다.
9. 7번째 줄: 식별자 str에 접근하려고 한다. 이때 자바스크립트 엔진은 활성화된 실행 컨텍스트의 LexicalEnvironment에 접근한다.첫 요소의 environmentRecord에서 str이 있는지 찾아보고, 없으면 outerEnvironmentReference에 있는 environmentRecord로 넘어가는 식으로 계속해서 검색한다.여기서는 전역 LexicalEnvironment에 str이 있으므로 '안녕'을 출력한다.
10. 8번째 줄: inner 함수 실행이 종료된다. inner 실행 컨텍스트가 콜 스택에서 제거되고, outer 실행 컨텍스트가 다시 활성화되면서 9번째 줄로 이동한다.
11. 10번째 줄: outer 함수 실행이 종료된다. outer 실행 컨텍스트가 콜 스택에서 제거되고, 전역 컨텍스트가 다시 활성화 된다.
12. 13번째 줄: 전역 컨텍스트의 environmentRecord에서 str을 검색해서 실행한다.
13. 완료: 모든 코드의 실행이 종료되어 전역 컨텍스트가 콜 스택에서 제거되고 종료된다.

## 궁금증

1. 예시 코드에서 environmentRecord의 식별자로 저장하는 것은 호이스팅인가?
   - A : O
   - 호이스팅 : 변수 선언문이나 함수 선언문 등을 해당 스코프의 선두로 옮기는 것
     - 코드 해석을 좀 더 수월하게 하기 위해 environmentRecord의 수집 과정을 추상화한 개념
2. 어떤 것이 호이스팅 되나요?
   - A : 모든 선언
   - 변수의 경우 정의부만 호이스팅되지만, 함수의 경우 표현식은 호이스팅 되지 않고, 선언식은 호이스팅 된다. (구체적인 것은 4번에)
   - class의 경우 표현식이기 때문에 호이스팅 되지 않는다.
   - JS의 함수는 일급객체(=일급시민)이기 때문에 함수 표현식이 가능하다.
     - 일급객체 : 변수에 담을 수 있고 & 매개변수에 넘길 수 있고 & 함수에서 반환할 수 있는 것
3. 그렇다면 왜 var을 선언 전에 사용하면 undefined가 출력되고, let과 const는 ReferenceError가 발생할까요?

   - A : let, const키워드로 선언된 변수는 스코프의 시작에서 변수의 선언까지 '일시적 사각지대(TDZ, Temporal Dead Zone)에 빠지기 떄문이다.
   - 변수 생성 3단계
     1. 선언 단계 : 변수를 `실행 컨텍스트의 변수 객체에 등록`하는 단계.
     2. 초기화 단계 : 실행 컨텍스트에 존재하는 변수 객체에 선언 단계의 `변수를 위한 메모리를 만드는 단계`. 이 단계에서 할당된 메모리에는 undefined로 초기화
     3. 할당 단계 : 사용자가 undefined로 초기화된 `메모리의 다른 값을 할당`하는 단계
   - var : 선언과 초기화가 동시에 진행 -> undefined 반환

     <img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbTw4S0%2Fbtrdo9ZlIjA%2FoRkfUVW0DuMd5adCWqRs3k%2Fimg.png' width=400 />

   - let, const : 선언과 초기화가 분리되어 진행 -> ReferenceError 발생

     <img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbH3TyJ%2Fbtrdr43iEBw%2FVYwqJInmw0BnZKDpyIgFa0%2Fimg.png' width=400 />

   - TDZ의 영향을 받는 구문 : let, const, class, constructor()내부의 super()
   - TDZ의 영향을 받지 않는 구문 : var 변수, 함수 선언식

4. 모든 함수는 호이스팅이 일어나나요?

   - A : NO. `함수 선언식은 호이스팅이 일어나`지만, 함수 표현식은 호이스팅이 일어나지 않는다.
   - 함수 선언식 e.g. : `function foo() {}`
     - 함수 전체를 호이스팅 되기에 선언 전에 사용 가능
   - 함수 표현식 e.g. : `const foo = function() {}`
     - 변수에 함수를 할당하는 것이기 때문에 변수 호이스팅이 일어나지만, 함수 호이스팅은 일어나지 않는다.
     - ver로 선언하면 호이스팅이 일어나지만, undefined로 초기화되기 때문에 함수 호출 시 ReferenceError가 발생한다.
   - Airbnb JS Style Guide에서는 함수가 선언되기 전에 호출되는 것을 방지하기 위해 함수 선언식을 사용하지 않고 `함수 표현식을 사용하도록 권장`한다.

5. Variable Environment는 언제 쓰는가?

### Reference

[자바스크립트 실행 환경](https://junilhwang.github.io/TIL/Javascript/Domain/Execution-Context/#_2-%E1%84%89%E1%85%B5%E1%86%AF%E1%84%92%E1%85%A2%E1%86%BC-%E1%84%8F%E1%85%A5%E1%86%AB%E1%84%90%E1%85%A6%E1%86%A8%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3-%E1%84%80%E1%85%AE%E1%84%89%E1%85%A5%E1%86%BC)

[실행 컨텍스트란 무엇인가요?](https://velog.io/@edie_ko/js-execution-context)

[let과 const는 호이스팅되지 않는다?? TDZ란](https://taenami.tistory.com/m/87)

[호이스팅(Hoisting)이란?](https://hanamon.kr/javascript-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85%EC%9D%B4%EB%9E%80-hoisting/)

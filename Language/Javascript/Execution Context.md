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

- 함수를 선언할 때가 아니라 실행할 때 생성

1. 전역공간
   - 브라우저의 경우 window 객체, Node.js의 경우 global객체
2. `함수 실행`
3. eval() 함수 실행
4. block을 만든다.

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

### 실행 컨텍스트를 구성할 때 생기는 것

1. Variable Environment : 현재 컨텍스트 내의 `식별자(변수)들에 대한 정보` + `외부 환경 정보`
   - 최초 실행 시의 스냅샷 유지
2. Lexical Environment(=어휘적 환경) : 처음에는 Variable Environment와 동일
   - 변경 사항이 실시간 반영
   1. environment Record : 현재 컨텍스트와 관련된 코드의 식별자 정보가 저장 e.g. 매개변수의 이름, 함수 선언, 변수명 등
   2. outerEnvironment Reference : 바깥에 있는 environment record를 참조 -> 스코프 체인을 구현
3. This Binding : 식별자가 바라봐야할 대상 객체

## 예시

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

## 참고

[자바스크립트 실행 환경](https://junilhwang.github.io/TIL/Javascript/Domain/Execution-Context/#_2-%E1%84%89%E1%85%B5%E1%86%AF%E1%84%92%E1%85%A2%E1%86%BC-%E1%84%8F%E1%85%A5%E1%86%AB%E1%84%90%E1%85%A6%E1%86%A8%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3-%E1%84%80%E1%85%AE%E1%84%89%E1%85%A5%E1%86%BC)

[실행 컨텍스트란 무엇인가요?](https://velog.io/@edie_ko/js-execution-context)

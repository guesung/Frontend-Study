# Closure

## Intro

- [실행 콘텍스트](https://junilhwang.github.io/TIL/Javascript/Domain/Execution-Context/)에 대한 사전 지식 있으면 어렵지 않은 개념
- 함수형 프로그래밍 언어(함수를 일급객체로 취급)에서 사용되는 중요한 특성

## Clousre란?

- Closure : 반환된 내부함수가 자신이 선언됐을 때의 환경(Lexical environment)인 스코프를 기억하여 자신이 선언됐을 때의 환경(스코프) 밖에서 호출되어도 그 환경(스코프)에 접근할 수 있는 함수

  - 간단히 말해, 자신이 생성될 때의 환경(Lexical environment)을 기억하는 함수

- 예시 1

  ```js
  function outerFunc() {
    var x = 10;
    var innerFunc = function () {
      console.log(x);
    };
    innerFunc();
  }
  ```

  - 위의 코드에서 innerFunc 함수는 자신이 선언됐을 때의 환경인 outerFunc 함수의 스코프에 접근할 수 있다.
  - 이러한 innerFunc 함수를 클로저라고 한다.
  - **렉시컬 스코핑** : 함수를 호출할 때가 아니라, 함수를 어디에 선언하였는지에 따라 결정됨
  - **렉시컬 환경** : 함수가 선언된 환경

- 예시 2

  ```js
  function outerFunc() {
    var x = 10;
    var innerFunc = function () {
      console.log(x);
    };
    return innerFunc;
  }

  // 함수 outerFunc를 호출하면 내부 함수 innerFunc가 반환된다.
  // 그리고 함수 outerFunc의 실행 컨텍스트는 소멸한다.
  var inner = outerFunc();
  inner(); // 10
  ```

  - 위의 코드에서 outerFunc 함수가 종료되어 실행 컨텍스트가 소멸(콜스택에서 pop)된 이후에도 innerFunc 함수가 outerFunc 함수의 변수에 접근할 수 있다.
  - 이는 innerFunc 함수가 자신이 선언됐을 때의 렉시컬 환경인 outerFunc 함수의 스코프를 기억하기 때문이다.
  - 이러한 innerFunc 함수를 클로저라고 한다.

## 클로저의 장점

1. 데이터 보존 : 외부 함수의 실행이 끝나더라도 외부 함수 내 변수 사용 가능
2. 정보의 접근 제한 (캡슐화)
3. 모듈화에 유리 : 클로저 함수를 각각의 변수에 할당하면 각자 `독립적으로 값을 보존 가능` -> 데이터와 메소드를 묶어다닐 수 있음

## 클로저의 특징

1. 클로저의 핵심은 스코프를 이용해서, 변수의 `접근 범위를 닫는(폐쇄)것`에 있다.

   - 외부 함수 스코프에서 내부함수 스코프로 접근 불가능
   - 내부 함수에서는 외부함수 스코프에(변수 등) 접근 가능

2. 함수가 호출되는 환경과 별개로, `기존에 선언되어 있던 환경(어휘적 환경)을 기준으로 변수를 조회`한다.

   - 외부함수의 실행이 종료된 후에도(callstack에서 pop되어도), 클로저 함수는 외부함수의 스코프, 즉, 함수가 선언된 어휘적 환경에 접근할 수 있습니다.

-

## 클로저 활용

- 활용 1

  ```html
  <!DOCTYPE html>
  <html>
    <body>
      <button class="toggle">toggle</button>
      <div
        class="box"
        style="width: 100px; height: 100px; background: red;"
      ></div>

      <script>
        var box = document.querySelector(".box");
        var toggleBtn = document.querySelector(".toggle");

        var toggle = (function () {
          var isShow = false;

          // ① 클로저를 반환
          return function () {
            box.style.display = isShow ? "block" : "none";
            // ③ 상태 변경
            isShow = !isShow;
          };
        })();

        // ② 이벤트 프로퍼티에 클로저를 할당
        toggleBtn.onclick = toggle;
      </script>
    </body>
  </html>
  ```

  1. 즉시실행함수(`function(){} 부분`)는 함수를 반환하고 즉시 소멸한다. 즉시실행함수가 반환한 함수는 자신이 생성됐을 때의 렉시컬 환경(Lexical environment)에 속한 변수 isShow를 기억하는 클로저다. 클로저가 기억하는 변수 isShow는 box 요소의 표시 상태를 나타낸다.

  2. 클로저를 이벤트 핸들러로서 이벤트 프로퍼티에 할당했다. 이벤트 프로퍼티에서 이벤트 핸들러인 클로저를 제거하지 않는 한 클로저가 기억하는 렉시컬 환경의 변수 isShow는 소멸하지 않는다. 다시 말해 현재 상태를 기억한다.

  3. 버튼을 클릭하면 이벤트 프로퍼티에 할당한 이벤트 핸들러인 클로저가 호출된다. 이때 .box 요소의 표시 상태를 나타내는 변수 isShow의 값이 변경된다. 변수 isShow는 클로저에 의해 참조되고 있기 때문에 유효하며 자신의 변경된 최신 상태를 게속해서 유지한다.

  > 이처럼 클로저는 현재 상태(위 예제의 경우 .box 요소의 표시 상태를 나타내는 isShow 변수)를 기억하고 이 상태가 변경되어도 최신 상태를 유지해야 하는 상황에 매우 유용하다. 만약 자바스크립트에 클로저라는 기능이 없다면 상태를 유지하기 위해 전역 변수를 사용할 수 밖에 없다. 전역 변수는 언제든지 누구나 접근할 수 있고 변경할 수 있기 때문에 많은 부작용을 유발해 오류의 원인이 되므로 사용을 억제해야 한다.

- 활용 2

  1. counter를 1씩 더하는 코드

     ```js
     var counter = 0;

     function increase() {
       return ++counter;
     }

     incleaseBtn.onclick = function () {
       count.innerHTML = increase();
     };
     ```

     - counter변수가 전역 변수이기 때문에 다른 함수에서도 접근 가능 -> 다른 함수에서도 counter 변수를 변경할 수 있기 때문에 의도치 않게 counter변수의 값이 변경될 수 있음
     - 함수형 프로그래밍에서는 `상태 변경을 피해`야 하기 때문에 카운트 상태를 유지하기 위해 `전역 변수를 사용하는 것은 바람직하지 않음`
     - 이를 방지하기 위해 클로저를 사용

  2. 1번 코드를 수정 (변수 초기화를 함수 안에 넣음)

     ```js
     function increase() {
       // 카운트 상태를 유지하기 위한 지역 변수
       var counter = 0;
       return ++counter;
     }
     incleaseBtn.onclick = function () {
       count.innerHTML = increase();
     };
     ```

     - increase 함수가 호출될 때마다 카운트 상태를 유지하기 위해 지역 변수 counter를 0으로 초기화 -> increase 함수가 호출될 때마다 카운트 상태가 초기화되어 카운트가 제대로 이루어지지 않음

  3. 2번 코드를 수정 (즉시실행함수를 사용)

     ```js
     var increase = (function () {
       // 카운트 상태를 유지하기 위한 자유 변수
       var counter = 0;

       // 클로저
       return function () {
         return ++counter;
       };
     })();
     incleaseBtn.onclick = function () {
       count.innerHTML = increase();
     };
     ```

     1. 스크립트가 실행되면 즉시실행함수가 호출됨
     2. 자유 변수 `counter=0`으로 초기화되고, 변수 increase에는 함수 `function(){return ++counter;}`가 할당

        - 이 함수는 자신이 생성되었을 때의 렉시컬 환경을 기억하는 클로저

     3. 즉시실행함수는 호출된 이후 소멸되지만 즉시실행함수가 반환한 함수는 변수 increase에 할당되어 increase 버튼을 누르면 클릭 이벤트 핸들러 내부에서 호출

     > - 이 때, 클로저인 이 함수는 자신이 선언되었을 때의 렉시컬 환경인 즉시실행 함수의 스코프에 속한 지역변수 counter를 기억
     > - 따라서 즉시실행함수의 변수 counter에 접근할 수 있고 변수 counter는 자신이 참조하는 함수가 소멸될 때가지 유지

### 참고

[Clousre](https://poiemaweb.com/js-closure)

[Javascript Closure](https://hanamon.kr/javascript-%ED%81%B4%EB%A1%9C%EC%A0%80/)

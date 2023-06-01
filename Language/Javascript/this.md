# this

## this란?

- this : `자신이 속한 객체` 또는 `자신이 생성할 인스턴스를 가리키는 자기 참조 변수`(self-reference variable)
- this는 `코드 어디서든 참조`할 수 있지만, 객체의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수이므로 일반적으로 `객체의 메서드 내부` 또는 `생성자 함수 내부`에서만 의미가 있음

## 바인딩이란?

- 식별자와 값을 연결하는 과정
- 변수 선언 : 변수 이름 - 확보된 메모리 공간의 주소를 바인딩하는 것
- this 바인딩 : this - this가 가리킬 객체를 바인딩하는 것

## 1. this를 전역에서 사용하는 경우

- 브라우저라는 JS 런타임의 경우 this는 항상 window, Node.js라는 JS 런타임의 경우 this는 항상 global 참조
- 브라우저라는 JS 런타임에서 모든 변수와 함수는 window라는 객체의 프로퍼티와 메소드가 된다.

  <img src='https://i0.wp.com/hanamon.kr/wp-content/uploads/2021/07/node.js-%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%8B%E1%85%A7%E1%86%A8%E1%84%80%E1%85%A2%E1%86%A8%E1%84%8E%E1%85%A6-global.png?resize=768%2C839&ssl=1' width=400 />

## 2. this를 함수 내부에서 사용하는 경우

- 메소드 : 객체 안에서 선언된 함수. 전역에서 선언된 함수와 구분하기 위해 명칭
  - 사실, 전역에 선언된 함수도 전역 객체의 프로퍼티로 할당되어 있기 때문에 전역 객체의 메소드라고 할 수 있다.
- this는 함수를 호출하는 방법, 엄격모드 여부에 따라 참조 값이 달라짐

# 각 상황별 this

### 1. 함수 호출

- 기본적으로 this는 전역객체(global/window)에 바인딩 됨
- 내부함수는 일반 함수, 메소드, 콜백함수 어디에서 선언되었든 관계없이 전역객체에 bind
- \# 내부 함수 : 함수 안에 선언한 함수

  - 내부 함수 e.g.

  ```js
  function foo() {
    console.log("foo's this: ", this); // window. 이는 전역 객체의 메소드 -> 전역 객체에 bind
    function bar() {
      console.log("bar's this: ", this); // window. 이는 전역 객체의 메소드의 내부 함수 -> 전역 객체의 bind
    }
    bar();
  }
  foo();
  ```

  - callback함수, 메소드의 내부 함수 e.g.

  ```js
  var value = 1;

  var obj = {
    value: 100,
    foo: function () {
      console.log(this); // foo
      setTimeout(function () {
        console.log("callback's this: ", this); // window
        console.log("callback's this.value: ", this.value); // 1
      }, 100);
      function bar() {
        console.log("bar's this: ", this); // window
        console.log("bar's this.value: ", this.value); // 1
      }
      bar();
    },
  };

  obj.foo();
  ```

### 2. 메소드 호출

- 메소드 : 객체의 프로퍼티에 할당된 함수
- 메소드 내부의 this는 메소드를 호출한 객체에 바인딩 됨

  - 메소드 e.g.

  ```js
  var obj1 = {
    name: "Lee",
    sayName: function () {
      console.log(this.name); // Lee. 메소드 안의 this이므로 obj1을 가리킴
    },
  };

  var obj2 = {
    name: "Kim", // Kim. 객체 안의 this이므로 obj2를 가리킴
  };

  obj2.sayName = obj1.sayName;

  obj1.sayName(); // Lee
  obj2.sayName(); // Kim
  ```

### 3. 생성자 함수 호출

- JS의 생성자 함수 : 기존 함수에 new 연산자를 붙여서 호출하는 함수
- this는 생성자 함수가 생성할 인스턴스에 바인딩 됨
- 생성자 함수 e.g.

  ```js
  // 생성자 함수
  function Person(name) {
    this.name = name;
  }

  var me = new Person("Lee");
  console.log(me); // Person&nbsp;{name: "Lee"}

  // new 연산자와 함께 생성자 함수를 호출하지 않으면 생성자 함수로 동작하지 않는다.
  var you = Person("Kim");
  console.log(you); // undefined
  ```

# 4. 화살표 함수 vs 일반 함수 바인딩

- 일반 함수에서의 this : 함수를 호출할 때 함수가 어떻게 호출 되는지에 따라 동적으로 결정
  - 자신만의 스코프 생성 O
  - 위에서 다룬 것처럼, 내부 함수(-> 전역 객체)냐, 객체의 메소드(-> 생성할 객체)냐, 생성자 함수(->생성할 인스턴스)에 따라 달라짐
- 화살표 함수에서의 this : 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정
  - this 바인딩 객체 결정 방식은 함수의 상위 스코프를 결정하는 방식인 렉시컬 스코프와 유사
  - call, apply, bind 메소드로 변경 불가
  - 자신만의 스코프 생성 X

# Q&A

## 1. 화살표 함수와 일반 함수가 무엇인가요?

### 화살표 함수?

- ES6에서 새로 추가된 내용. 기존 함수 표현식과 비교하면 간결한 표현으로 간단하게 사용 가능
- 화살표 함수는 함수 표현식으로밖에 선언 못함

```js
function fun() { // 일반함수
  ...
}

const arrFun = () => { // 화살표 함수
  ...
};
```

### 화살표 함수와 일반 함수의 차이

1. this

- 일반 함수 : 함수를 호출(즉, 실행)할 때 `함수가 어떻게 호출되었는지에 따라` this에 바인딩할 객체가 동적으로 결정됨
  1. 함수 실행 시 : 전역 객체 가리킴
  2. 메소드 실행 시 : 메소드를 소유한 객체 가리킴
  3. 생성자 실행 시 : 새롭게 만들어진 객체 가리킴
- 화살표 함수 : `함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정`
  - 항상 상위 스코프의 this를 가리킴 (Lexical this)
  - call, bind, apply 메소드를 사용하여 this를 변경 불가능

2. 생성자 함수로 사용 가능 여부

- 일반 함수 : 생성자 함수로 사용 가능
- 화살표 함수 : 생성자 함수로 사용 불가능. prototype 프로퍼티를 가지고 있지 않기 때문

3. arguemnts 사용 가능 여부

- 일반 함수 : 함수가 실행될 때 암묵적으로 arguemnts 변수가 전달되어 사용 가능
- 화살표 함수 : 사용 불가능

```js
function fun() {
  console.log(arguments); // Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
}

fun(1, 2, 3);
```

- 하지만, 모든 JS 함수, 일반 함수화 화살표 함수 모두 호출되면 각자의 실행 context를 생성함
  - 실행 컨택스트 : 함수가 실행되는 동안 필요한 환경 정보 담고 있음(Variable Environment, Lexical Environment, This Binding)

### 화살표 함수에서, 실행 context는 가지고 있지만, 스코프를 생성하지 않는다는 게 무슨 말인가요?

### 그렇다면, 함수 선언식은 무엇이고, 함수 표현식은 무엇인가요?

- 함수 선언식 : 함수를 선언
  ```js
  function hello() {
    console.log("hello");
  }
  ```
  - 어디서든 호출 가능(함수 생성 이전에도)
    - 함수 전체가 호이스팅 되기 때문
- 함수 표현식 : 변수에 함수를 할당
  ```js
  const hello = function () {
    console.log("hello");
  };
  const hello = () => {
    console.log("hello");
  };
  ```
  - 함수를 생성한 코드 아래에서만 호출 가능
    - 변수 호이스팅(hello라는 변수)은 일어나지만, 함수 호이스팅은 일어나지 않음 -> let,const의 경우 `Reference Error` 발생, var의 경우 `Type Error`발생

### 생성자 함수가 뭔가요?

- 생성자 함수 : 일반 함수와 기술적인 차이가 없음. but 아래 2가지의 관례를 따름

  - 함수 이름의 첫 문자를 대문자로 시작
  - 반드시 `new` 연산자를 붙여 실행

  ```js
  function User(name) {
    this.name = name;
    this.isAdmin = false;
  }

  let user = new User("보라");

  alert(user.name); // 보라
  alert(user.isAdmin); // false
  ```

  1. 빈 객체를 만들어 this에 할당
  2. 함수 본문을 실행 -> this에 새로운 프로퍼티를 추가해 this를 수정
  3. this를 반환

- `new.target`프로퍼티를 사용하여 함수가 `new`와 함께 호출되었는지 아닌지 알 수 있음
- 반환해야할 것들은 `this`에 저장되고, `this`가 자동으로 반환되기에 반환문 명시적으로 써줄 필요 없음

# Reference

- [JavaScript - 화살표 함수와 일반 함수의 차이](https://hhyemi.github.io/2021/06/09/arrow.html)

- [함수 표현식&선언식, 화살표 함수(arrow function)](https://any-ting.tistory.com/129)
- [생성자 함수](https://ko.javascript.info/constructor-new)

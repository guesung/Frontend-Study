# iterable&iterator

- 이터러블 : 자료를 반복할 수 있는 객체
- iterable Protocol / iterator Protocol : 이터러블을 [for...of], [전개 연산자], [비구조화] 등 이터러블이나 이터레이터 프로토콜을 따르는 연산자들과 함께 동작하도록 하는 약속된 규약
- iterable : iterable 규약을 따르는 객체

## iterable

- 정의 : iterator를 return하는 [Symbol.iterator]()메서드를 가진 객체
- 배열과 문자열의 경우 Array.prototype의 Symbol.iterator을 상속받기 때문에 iterable

## itarator

- 정의 : {value:값, done:true/false} 형태의 iterator 객체를 return 하는 next()메서드를 가진 객체
- [Symbol.iterator]() 안에 정의되어 있음

```js
const arr = [1, 2, 3]; //arr는 그냥 평범한 배열

const iter = arr[Symbol.iterator]();
/*
문법 파헤치기 : key값을 문자열이 아닌 변수로 주기위해 arr[변수] 형태를 가진다.
위 사진에서 보듯이, Symbol.iterator 라는 key값을 가지고 value는 함수이다. 
이를 접근해서 함수실행() 시키면 이터레이터 객체가 반환되어 iter에 담기게 된다.
*/

iter.next();
//>{value:1,done: false}
iter.next();
//>{value:2, done: false},
iter.next();
//{value:3, done: false}
iter.next();
//{value: undefined, done: true}
```

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FLrBsf%2FbtrgV98oHHT%2F20uKFZkyEZlzRlkOQh0Uak%2Fimg.png)

## [Symbol.iterator]

- 직접 iterable 객체 만들기

```js
let range = {
  // 1) 객체 생성
  from: 1,
  to: 5,
};

range[Symbol.iterator] = function () {
  // 2) 새로운 키:밸류 를 추가한다. 키는 변수형태, 밸류는 함수이다.

  return {
    // 객체를 리턴한다. 그런데 좀 특별할 형태의 객체
    current: this.from,
    last: this.to,

    next() {
      // 3) next() 정의
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
        // 4) {value : 값 , done : true/false} 형태의 이터레이터 객체를 리턴합니다.
      } else {
        return { done: true };
      }
    },
  };
};
```

1. 평범한 range객체를 만든다.
2. 우리가 흔히쓰는 객체에 새로운 key:value를 추가하고 싶을때, range[key] = value 를 통해 Symbol.iterator 키값과 밸류는 함수를 지정해 넣었다.
3. 추가한 함수는 어떠한 특별한 객체를 return하게 되어있고, 이 객체 안에 next()라는 메소드를 정의 하였다.
4. 최종적으로 `{value : 값 , done : true/false}` 형태의 이터레이터 객체를 return한다.

- iterable 객체 : range. Symbol.iterator메서드를 가지고 있기 때문에
- iterator 객체 : Symbol.iterator() 메서드를 return한 객체

    <img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcxQYic%2FbtrgWafaLUA%2F8cmz5tmpGwjInRhbroEFk1%2Fimg.png' width=400 />

## 유사배열 vs 이터러블

- 이터러블 : 위에서 설명한 것과 같이 메서드 `Symbol.iterator`가 구현된 객체

  - e.g. Array.from()을 쓰면 이터러블이나 유사 배열을 받아 '진짜' Array를 만들어줌

  ```js
  let arrayLike = {
    //유사배열
    0: "Hello",
    1: "World",
    length: 2,
  };
  Array.from(arrayLike); // ["Hello", "World"]

  let arr = Array.from(arrayLike); // ["Hello", "World"] 배열이 됨으로서 이터러블 객체도 된다.
  for (let item of arr) {
  }
  // Hello
  // World
  ```

  - e.g. 문자열, Map, Set, DOM 노드 리스트 등은 모두 이터러블 작업이 마쳐진 유사배열

- 유사배열 : 인덱스와 length 프로퍼티가 있어서 배열처럼 보이는 객체

# 참고

- [이터러블&이터레이터](https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EC%9D%B4%ED%84%B0%EB%9F%AC%EB%B8%94-%EC%9D%B4%ED%84%B0%EB%A0%88%EC%9D%B4%ED%84%B0-%F0%9F%92%AF%EC%99%84%EB%B2%BD-%EC%9D%B4%ED%95%B4)

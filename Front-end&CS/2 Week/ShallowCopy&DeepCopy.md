# 얕은 복사 vs 깊은 복사 의미

객체, 배열, 함수와 같은 **참조타입**의 데이터는 복사 시 데이터의 값이 아닌, **값이 저장된 메모리의 주소**가 저장됩니다. 따라서 참조 타입의 데이터를 복사하는 방법으로 얕은 복사와 깊은 복사로 나뉩니다.

<img src='https://velog.velcdn.com/images/haizel/post/c04dc5e5-35b9-44ae-98d6-424d8011e66d/image.png' width='500'/>
**얕은 복사**는 참조 타입 데이터가 저장한 `메모리의 주소값`을 복사하는 것을 의미합니다. 즉 메모리 상 같은 주소를 가르키는 참조 변수 하나가 더 생기는 방법입니다.


**깊은 복사**는 새로운 메모리 공간을 확보해 참조 타입 데이터의 `내용`을 복사하는 것을 의미합니다. 따라서 메모리 상 같은 내용을 가진 변수 혹은 객체가 하나 더 생기는 방법입니다.

<br />

## 얕은 복사 vs 깊은 복사 방법

### 얕은 복사

변수를 선언하고 복사할 변수 혹은 객체를 해당 변수에 할당하는 방식으로 이루어집니다.

```tsx
const arr = [1, 2, 3];
const arr1 = arr;
checker(arr, arr1); // false -> 단순히 주소값만 복사(얕은 복사)
```
<br />

### 깊은 복사

이에 반해 깊은 복사는 대표적으로  `Array.prototype.slice`, `Spread 연산자,` `Object.assign`, `JSON.stringify` 4가지 방법을 통해 이뤄집니다.

하지만 slice와 Spread 연산자, Object.assign의 경우, 1레벨 즉 1차원 배열에 대해선 깊은 복사가 허용되나, 2레벨(2차원 배열) 이상부터는 깊은 복사가 허용되지 않는다는 문제가 있습니다.

**📑 Array.prototype.slice**

1 depth 배열에선 깊은 복사가 허용되지만, 2depth 이상인 배열에선 깊은 복사가 되지 않는다.

```tsx
/* <--- 1 depth 배열 ---> */
const arr = [1, 2, 3];
const copied = arr.slice();
checker(arr, copied); // true
copied.push(4);
checker(arr, copied); // false

/* <--- 1 depth 배열 ---> */
const arr = [1, 2, [3, 4]];
const copied = arr.slice();
checker(arr, copied); // true
copied[2].push(5);
checker(arr, copied); // true --> false가 되야함
```

**📑 Spread 연산자**

```jsx
const arr = [1, 2, [3, 4]];
const copied = [ ...arr ];
checker(arr, copied); // true
copied[2].push(5);
checker(arr, copied); // true --> false가 되야함
```

**📑 Object.assign**

```jsx
const arr = [1, 2, [3, 4]];
const copied = Object.assign([], arr);
checker(arr, copied); // true
copied[2].push(5);
checker(arr, copied); //true --> false가 되야함
```

>`JSON.parse & JSON.stringify`를 이용하면 중첩된 배열의 깊은 복사가 허용되지 않는 문제를 해결할 수 있습니다. 
<br />

**📑 JSON.parse & JSON.stringify**

JSON.stringify를 활용해 데이터를 문자로 변형시키고 → JSON.parse로 다시 문자를 객체 데이터로 변형시킵니다.

```jsx
const arr = [1, 2, [3, 4]];
const copied = JSON.parse(JSON.stringify(arr));
checker(arr, copied); // true

copied[2].push(5);
checker(arr, copied); // false --> 중첩 배열도 깊은 복사가 된다.
```

하지만 JSON은 function, arrow Function, undefined 데이터 타입에서는 사용이 불가능하다는 한계점이 존재합니다.

따라서 대표적인 깊은 복사 방법으로 알려진 `Array.prototype.slice`, `Spread 연산자,` `Object.assign`, `JSON.stringify` 통해선 완벽한 깊은 복사를 실현할 수 없습니다.

<br />

### 완전한 깊은 복사를 구현하는 방법


따라서 완전한 깊은 복사를 구현하려면 3가지 방법을 활용할 수 있습니다.

첫번째는 모든 깊이에 객체를 복사할 수 있는 `재귀함수`를 구현하는 방법입니다. 하지만 모든 깊이에 대해 복사하는 코드를 구현해야하는 번거로움이 있고, 가독성 문제와 많은 메모리 공간을 차지한다는 문제가 있습니다.

두번째는 위 `JSON.parse & JSON.stringify` 를 활용하는 방법입니다. 하지만 위에서 살펴본 바와 같이 몇 데이터 타입엔 사용이 불가능하다는 한계점이 존재합니다.

마지막으로 `Lodash 와 Ramda` 와 같은 외부 라이브러리를 설치해 사용하는 방법이다. 추가 라이브러리를 설치하고, 사용법을 익혀야 하는 번거로움이 있습니다.

<br />

## 정리


객체, 배열, 함수와 같은 **참조 타입** 데이터는 복사 시 데이터의 값이 아닌, **값이 저장된 메모리 주소**가 복사됩니다. 따라서 **얕은 복사**는 참조 타입 데이터의 `메모리 주소값`을 복사하는 것을 말하며, **깊은 복사**는 참조 타입 데이터의 `내용`을 복사하는 것을 의미합니다.

대표적인 깊은 복사 방법으로는 slice, Spread연산자, Object.assign이 있습니다. 하지만 위 방법은 1레벨(1차원 배열)에 대해서만 깊은 복사가 허용되며, 2레벨(2차원 배열)부터는 깊은 복사가 허용되지 않습니다.

따라서 완전한 깊은 복사를 하기 위해선 3가지 방법을 활용할 수 있습니다.
<br />
첫째, 모든 깊이에 객체를 복사할 수 있는 **재귀함수**를 구현하는 방법입니다. 하지만 모든 깊이에 대해 복사하는 코드를 구현해야하는 번거로움이 있고, 가독성 문제와 많은 메모리 공간을 차지한다는 문제가 있습니다.
<br />
두번째는 **JSON.parse & JSON.stringify**를 활용하는 방법입니다.
JSON.stringify를 활용해 데이터를 문자로 변형시키고. JSON.parse로 다시 문자를 객체 데이터로 변형시키면 2레벨 이상의 배열에서도 깊은 복사를 실현할 수 있습니다. 하지만 JSON은 function, arrow Function, undefined 데이터 타입에서는 사용이 불가능하다는 한계점이 존재합니다.
<br />
마지막으로 **Lodash 와 Ramda**와 같은 외부 라이브러리를 설치해 사용하는 방법이 있습니다. 마찬가지로 라이브러리를 추가 설치하고, 사용법을 익혀야하는 번거로움이 존재합니다.

<br />

**📎 참고문서**

- [깊은 복사 VS 얕은 복사 (Deep Copy VS Shallow Copy)](https://j-i-y-u.tistory.com/20)
- [깊은 복사와 얕은 복사에 대한 심도있는 이야기](https://medium.com/watcha/%EA%B9%8A%EC%9D%80-%EB%B3%B5%EC%82%AC%EC%99%80-%EC%96%95%EC%9D%80-%EB%B3%B5%EC%82%AC%EC%97%90-%EB%8C%80%ED%95%9C-%EC%8B%AC%EB%8F%84%EC%9E%88%EB%8A%94-%EC%9D%B4%EC%95%BC%EA%B8%B0-2f7d797e008a)
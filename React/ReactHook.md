# React Hook

## React Hook이란?

- React에서 기존에 사용하던 Class를 이용한 코드를 작성할 필요 없이 state와 여러 React 기능을 사용할 수 있도록 만든 라이브러리
- 함수 컴포넌트로 클래스 컴포넌트처럼 사용하기 위한 방법

## 규칙

1. 함수 컴포넌트 몸통이 아닌, 몸통 안 복합 실행문의 {} 에서는 사용 불가
2. 비동기 함수(async 키워드가 붙은 함수)는 콜백함수로 사용 불가

## 종류

1. `useState` : 컴포넌트의 state(상태) 관리

   - state : React에서 사용자의 반응에 따라, 화면을 바꿔주기(렌더링) 위해 사용되는 트리거역할을 하는 변수
   - React는 state를 감시하고, 바뀐 정보에 따른 화면을 표시

2. `useEffect` : 렌더링 이후 실행할 코드 만들 수 있음

   - 비동기 방식

3. `useLayoutEffect` : 모든 DOM 변경 후 브라우저가 화면을 그리기(render)전에 실행되는 기능을 정할 수 있다.

   - 동기 방식 : 끝날 때까지 React가 기다려줌
   - useEffect와 선언, 사용 방식 동일

4. `useContext` : 부모 컴포넌트와 자식 컴포넌트 간의 변수와 함수를 전역적으로 정의

   - 장점 : context를 이용하여 props를 사용하지 않고, 컴포넌트 간의 직통으로 데이터를 전달할 수 있다.
   - 단점 : 불필요한 랜더링이 발생할 수 있다.

5. `useReducer` : 컴포넌트의 상태 업데이트 로직을 컴포넌트에서 분리시킬 수 있음

   - Redux 개념
   - useState를 여러 번 사용하는 경우 유용

   1. state : 상태
   2. action : 변화내용 객체
   3. reducer : state와 action 인자로 받아, 다음 상태 반환하는 함수
   4. dispatch : action을 반환하는 함수

6. `useRef` : 컴포넌트나 HTMl 요소를 래퍼런스로 관리

   - current속성을 가지고 있는 객체를 반환
   - current 값이 바뀌어도, 재랜더링 되지 않는다.
   - 재랜더링시에도 current값은 없어지지 않는다.

7. `forwardRef` : useRef로 만든 레퍼런스를 상위 컴포넌트로 전달

   - 부모 컴포넌트에서 자식 컴포넌트를 객체 형식으로 관리 가능

8. `useImperativeHandle` : useRef로 만든 래퍼런스의 상태에 따라, 실행할 함수를 정의 할 수 있다.

9. `useMemo`, `useCallback` : 의존성 배열에 적힌 값이 변할 때만 값,함수를 다시 정의할 수 있다. ( 재랜더링시 정의 안함 )
   - Memoization : 과거에 계산한 값을 반복해서 사용할 때, 그 값을 캐시에 저장하는 것
     - 재귀함수에 사용하면, 불필요한 반복 수행을 대폭 줄일 수 있다.
     - 의존성을 가지므로, 첫 렌더링 시에만 저장할 변수를 설정할 수 있다.
   - useMemo : 함수의 반환값을 저장
   - useCallback : 함수 자체를 저장
10. `useDebugValue` : 사용자 정의 Hook의 디버깅을 도와준다.

# Reference

- [React Hooks란? / 사용법 ( useState, useEffect 등등.. )](https://defineall.tistory.com/900)
- [공식 문서](https://ko.legacy.reactjs.org/docs/hooks-intro.html)

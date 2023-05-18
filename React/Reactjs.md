# React

## React 등장 배경

- React 등장 이전에도 많은 라이브러리/프레임워크가 존재 e.g. jQuery, Vue.js, Angular.js

1. Vanilla Javascript로 직접 DOM을 조작

   - Vanilla Javscript : 플러그인이나, 라이브러리를 사용하지 않은 순수 자바스크립트

   ###### SW세계에서의 Vanilla(바닐라) = 일반(plain)

   - DOM요소를 검색할 시 Jquery보다 425배 빠름

   ```js
   function handleResize() {
     console.log("I have been resized");
   }
   window.addEventListener("resize", handleResize());
   window.addEventListener("resize", handleResize);
   ```

2. 시간이 흐르면서 web App의 크기가 커지자, JS파일이 넘쳐나면서 통제가 어려워졌고, 이를 효율적으로 관리하기 위해 backbone.js, jQuery 같은 라이브러리 등장
   - jQuery : JS 라이브러리로, `HTML의 클라이언트 사이드 조작을 단순화(DOM API)`하고, 이벤트 처리, 애니메이션, Ajax 상호작용을 훨씬 쉽게 구현
   ```js
   $(document).ready(function () {
     $("button").click(function () {
       $("#test").hide();
     });
   });
   ```
3. 서버에서는 `REST API`, `GraphQL` 같이 브라우저 렌더링에 필요한 데이터만 제공하는 형태로 기술 변화
4. 직접적으로 DOM을 다루는 행위 감소 -> 상태(state)를 기준으로 DOM을 렌더링하는 형태로 발전
5. 구글의 Angular.js 프레임워크 등장 : CSR의 시작
6. Facebook의 React 등장 : 컴포넌트 기반 개발의 시작
7. Vue.js 등장 : Angular + React의 장점을 모두 수용

## React?

- React : `상태값이 변경`될 때마다 UI를 자동으로 업데이트해주는 JS 라이브러리
- SPA(Single Page Application)을 만들 때 사용
- Virtual DOM을 통해 변경된 부분만 효율적으로 업데이트

## Why React?

1. Virtual DOM 사용

   - **Reconciliation** : 실제로 DOM을 제어하지 않고, 중간에 virtual DOM을 두어 virtual DOM이 변경될 때 실제 DOM을 변경하도록 설계
     ###### Virtual Dom : 실제 DOM을 분석하여 만든 JS 객체
   - 불필요한 렌더링 과정의 비효율성을 최소화하기 위해 탄생
   - but 무조건 DOM보다 좋고 빠른 것은 아님
   - `setState()`혹은 Redux의 경우 `dispatch`메소드를 이용하여 virtualDOM 갱신

2. 컴포넌트 단위 개발

- 컴포넌트 : 블럭과 같이 작은 단위로 개발한 것을 조립하듯이 합치는 것
- 컴포넌트의 `가독성`, `캡슐화`, `확장성`, `결합성`, `재사용성`에 용이

3. JSX의 지원

   - JSX(Javscript+XML) : JS의 확장 구문으로, XML과 비슷한 문법을 사용하여 JS의 기능을 확장한 것
   - HTML과 JS를 한 곳에 작성

   ```jsx
   const hello = () => {
     return (
       <div>
         <h1>안녕하세요.</h1>
       </div>
     );
   };
   ```

4. [SSR, CSR 지원 가능](https://itprogramming119.tistory.com/entry/React-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EC%82%AC%EC%9D%B4%EB%93%9C-%EB%A0%8C%EB%8D%94%EB%A7%81CSR%EA%B3%BC-%EC%84%9C%EB%B2%84-%EC%82%AC%EC%9D%B4%EB%93%9C-%EB%A0%8C%EB%8D%94%EB%A7%81SSR)

5. 일방적인 데이터 흐름

   - 데이터 흐름 : state -> component -> 가상 DOM -> 실제 DOM과 비교 -> 화면에 그리기
   - 가상DOM과 실제 DOM의 비교는 자바스크립트 객체인 state로부터 시작 -> state를 기반으로 컴포넌트가 구성 -> 컴포넌트를 기반으로 가상 DOM을 그린후 -> 새로운 가상DOM과 이전 가상 DOM을 비교 -> 바뀐 부분이 있을 경우 해당 부분만 DOM에 반영하여 UI 업데이트
   - `React 작동원리`에서 더 자세히 다룰 예정

6. 라이브러리

   - Angular는 앱을 만드는데 필요한 모든 것이 갖춰진 프레임워크. 이에 반해 React는 UI 라이브러리로, 다른 라이브러리와 결합 가능
     - React 라이브러리 + ReactDOM Library = 웹 앱
     - React 라이브러리 + React Native Library = 모바일 앱
     - React 라이브러리 + React VR Library = VR 앱
     - React 라이브러리 + React 360 Library = 360도 사진, 동영상 뷰어

## React에 대해

### React 렌더링하는 경우

1. Props가 변경되었을 때
2. State가 변경되었을 때
3. forceUpdate() 를 실행하였을 때.
4. 부모 컴포넌트가 렌더링되었을 때

### 가상 DOM이란?

- 가상DOM : 실제DOM의 구조를 분석하여, 아래와 같은 형태로 메모리에 저장하고 관리하는 객체
- 렌더링시마다 새로운 가상DOM을 생성하여, 상태값 변경 이전/이후 달라진 부분을 비교하는 매커니즘을 사용한다.

  ```js
  {
     type: 'div',
     props: {
        children: [
              {
                 type: button,
                 props: {
                    children: "버튼입니다",
                    onClick: ()=>{}
                 }
              },
              {
                 type: input,
                 props: {children: "인풋입니다."}
              },
              {
                 type: CountButton,
                 props: {children: "리액트컴포넌트입니다"}
              }
        ]
     }
  }
  ```

## React 라이프사이클

### 참고

[리액트를 선택하는 이유](https://itprogramming119.tistory.com/entry/React-%EB%A6%AC%EC%95%A1%ED%8A%B8%EB%A5%BC-%EC%84%A0%ED%83%9D%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0)

[리액트의 탄생배경과 핵심 개념](https://soldonii.tistory.com/100)

[웹 동작 과정과 React의 탄생](https://velog.io/@juno7803/React%EA%B0%80-%ED%83%9C%EC%96%B4%EB%82%9C-%EB%B0%B0%EA%B2%BD)

[React 공식문서](https://ko.react.dev/)

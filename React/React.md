# React

## React?

- React : UI 구축을 위한 JS 라이브러리
- facebook에서 제공해주는 라이브러리
- SPA(Single Page Application)을 만들 때 사용
- 재사용 가능한 UI구성 요소를 만들 수 있음 -> 유지보수성 유리

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

2. 시간이 흐르면서 web App의 크기가 커지자, JS파일이 넘쳐나면서 통제가 어려워졌고, 이를 효율적으로 관리하기 위해 backbone.js 같은 라이브러리 등장
3. JS의 중요성이 점점 커지며 SPA 등장
   ###### SPA : html 파일을 1개만 쓰고 다른 페이지를 보여주고 싶을 때 html 부분만 바꿔서 보여줌 -> 부드럽게 동작& 트래픽 총량이 줄음 & 웹의 사용성 높이고 속도 향상
4. 구글의 Angular.js 프레임워크 등장 : 작은 컨테이너들이 모여 거대한 앱을 구성하도록 설계된 프레임워크 -> 사용자가 늘어날수록 홈페이지 내에서 user interaction이 기하급수적으로 증가하는데, 복잡성이 증가할수록 데이터의 흐름이 어디오 이어지는지 파악이 어려움
5. React 등장 : 데이터가 어디어 어디로 흐르는지 명확히 할 수 있음

## Why React?

1. Virtual DOM 사용

- **Reconciliation** : 실제로 DOM을 제어하지 않고, 중간에 virtual DOM을 두어 virtual DOM이 변경될 때 실제 DOM을 변경하도록 설계
- 불필요한 렌더링 과정으 ㅣ비효율성을 최소화하기 위해 탄생
- but 무조건 DOM보다 좋고 빠른 것은 아님
- `setState()`혹은 Redux의 경우 `dispatch`메소드를 이용하여 virtualDOM 갱신

2. 컴포넌트 단위 개발

- 컴포넌트 : 레고 블럭과 같이 작은 단위로 개발한 것을 조립하듯이 합치는 것
- 컴포넌트의 가독성 향상 & 캡슐화, 확장성, 결합성, 재사용성에 용이

3. JSX의 지원

- JSX(Javscript+XML) : JS의 확장 구문으로, XML과 비슷한 문법을 사용하여 JS의 기능을 확장한 것

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
  - 가상DOM과 실제 DOM의 비교는 자바스크립트 객체인 state로부터 시작 -> state를 기반으로 컴포넌트가 구성 -> 컴포넌트를 기반으로 가상 DOM을 그린후 -> 가상 DOM과 실제 DOM을 비교 -> 화면에 그리는 과정

6. 라이브러리

- Angular는 앱을 만드는데 필요한 모든 것이 갖춰진 프레임워크. 이에 반해 React는 UI 라이브러리로, 다른 라이브러리와 결합 가능
  - React 라이브러리 + ReactDOM Library = 웹 앱
  - React 라이브러리 + React Native Library = 모바일 앱
  - React 라이브러리 + React VR Library = VR 앱
  - React 라이브러리 + React 360 Library = 360도 사진, 동영상 뷰어

### 참고

[리액트를 선택하는 이유](https://itprogramming119.tistory.com/entry/React-%EB%A6%AC%EC%95%A1%ED%8A%B8%EB%A5%BC-%EC%84%A0%ED%83%9D%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0)

[리액트의 탄생배경과 핵심 개념](https://soldonii.tistory.com/100)

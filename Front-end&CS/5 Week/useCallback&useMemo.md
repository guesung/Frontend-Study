# 💡 사전 지식

## Memoization

컴퓨터 프로그램이 동일한 계산을 반복해야 할 때, `이전에 계산한 값을 메모리에 저장`함으로써 `동일 계산의 반복 수행을 제거하여 프로그램 실행 속도를 빠르게` 하는 기술을 말합니다.

useCallback과 useMemo는 **Memoization 기능**을 제공하는 React의 내장 Hook으로, 퍼포먼스 최적화를 위해 사용합니다.

## Re-rendering
<img src="https://velog.velcdn.com/images/haizel/post/628abe6a-e9aa-4c56-9877-2d2b1cb62892/image.png" width="600" />



이전에 생성한 컴포넌트 정보와 다시 렌더링한 정보를 비교해 최소한의 연산으로 DOM 트리를 업데이트하는 것을 말합니다. 즉 기존의 Virtual DOM과 현재의 Virtural DOM을 비교해 변경된 값만 DOM트리에 업데이트해줍니다.

useMemo와 USeCallback은 리렌더링 최적화를 돕은 Hook입니다. 주어진 렌더에서 수행해야 하는 작업 양을 줄이고, 컴포넌트가 다시 렌더링해야하는 횟수를 줄여 리렌더링을 최적화할 수 있도록 돕습니다.

 > 👉 **React의 Re-Rendering 조건**
>  - 자신의 state가 변경될 때
> - 부모 컴포넌트로부터 전달받은 props가 변경될 때
>  - 부모 컴포넌트가 리렌더링될 때
>  - forceUpdate 함수가 실행될 때


<br />


# 📝 useMemo

useMemo는 Memoization된 `값`을 반환하는 함수입니다.

두번째 인자로 받는 `deps 배열`에 변화가 생기면, 내부에 정의된 콜백 함수가 실행되고, 그 함수의 `반환 값`을 반환합니다.

```jsx
useMemo(() => fn, [])
```


### 예제코드

```jsx
import React, { useState, useMemo } from "react";

export default function App() {
  const [buttonX, setButtonX] = useState(0);
  const [buttonY, setButtonY] = useState(0);
  
  const handleButtonX = () => {
    setButtonX((prev) => prev + 1)
  };
  
  const handleButtonY = () => {
    setButtonY((prev) => prev + 1)
  };
  
  useMemo(() => {console.log(buttonX)}, [buttonX]);

  return (
    <>
      <button onClick={handleButtonX}>X</button>
      <button onClick={handleButtonY}>Y</button>
    </>
  );
}
```

useMemoe의 deps 배열로 buttonX값이 주어졌기 때문에 X 버튼을 누르면, hook안에 정의된 `console.log(buttonX)`가 실행됩니다. Y 버튼을 놀러도 함수 컴포넌트는 리렌더링되지만, buttonX의 값은 변하지 않기 때문에 `console.log(buttonX)` 는 실행되지 않습니다.

<br />

# 📞 USeCallback

useCallback은 Memoization된 `함수`를 반환하는 함수입니다. 즉 useMemo는 함수를 실행해 그 실행 값을 반환한다면, useCallback은 `함수 자체를 반환`합니다.

따라서 deps의 변화가 생기면 새로운 함수를 반환하게 됩니다.

```jsx
useCallback(fn, [])
```

### 예제코드

```jsx
import React, { useState, useCallback } from "react";

function App() {
  const [buttonX, setButtonX] = useState(0);
  const [buttonY, setButtonY] = useState(0);
  
  const handleButtonX = () => {
    setButtonX((prev) => prev + 1)
  };
  
  const handleButtonY = () => {
    setButtonY((prev) => prev + 1)
  };
  
  const returnUseCallback = useCallback(() => {console.log(buttonY)}, [buttonX]);
  
  returnUseCallback();
    
  return (
    <>
      <button onClick={handleButtonX}>X</button>
      <button onClick={handleButtonY}>Y</button>
    </>
  );
}

export default App;
```

UseCallback은 deps으로 주어진 buttonX값이 변화가 생길 때,  `() => {console.log(buttonY)}`함수를 반환합니다. 즉 Y버튼을 계속해 눌러도 X버튼을 누르지 않으면 `() => {console.log(0)}`함수가 반환되고, X버튼을 누르면 비로소 `() => {console.log(buttonY의 새로운값)}` 함수가 반환됩니다.

<br /> 즉 useCallback은 함수와 상관없는 상태 값이 변할 때, 함수 컴포넌트에서 불필요한 업데이트가 일어나는 것을 방지합니다. 이때 알아두어야할 useCallback의 특징 2가지가 있습니다.

<br />

### 1.  useCallback은 새로운 함수를 반환한다.

useCallback의 deps의 변경으로 반환되는 함수는 이전 함수와 형태는 같지만 새로운 함수입니다. 즉 새로운 무기명 함수를 반환한 것이며, 이전 함수와 값이 같을 뿐, 다른 메모리 주소를 가집니다.

### 2. 하위 컴포넌트가 PureComponent여야만 UseCallback이 유효하다.

단순히 useCallback의 사용만으로는 하위 컴포넌트의 리렌더링을 방지할 수 없습니다. 하위 컴포넌트가 PureComponent 여야만 비로소 불필요한 리렌더링을 막을 수 있습니다. 이를 위해서 컴포넌트를 `React.memo()`로 래핑하면 해당 컴포넌트는 PureComponent가 됩니다.


> 👉 **React.PureComponent**
<br />
> 
> React.PureComponent에 shouldComponentUpdate()가 적용된 버전을 말합니다.

<br />

# ⚛︎ React.memo

컴포넌트가 React.memo()로 래핑될 때, React는 컴포넌트를 렌더링하고 결과를 Memoizing합니다. 그 후, 다음 렌더링이 일어날 때 props가 같다면, Memoizing된 내용을 재사용합니다.

### 예제코드

```jsx
export function Movie({ title, releaseDate }) {
  return (
    <div>
      <div>Movie title: {title}</div>
      <div>Release date: {releaseDate}</div>
    </div>
  );
}

export const MemoizedMovie = React.memo(Movie);
```

`props`으로 주어진 title, releaseDate가 변경되지 않으면, 다음 렌더링 때 Memoizing된 내용을 그대로 사용하게 됩니다.

<br />

 ## 💡 React.Memo는 HOC이다.

 `React.memo`는 HOC(High-Orger-Components)로 컴포넌트를 인자로 받아서 새로운 컴포넌트를 반환하는 구조의 함수입니다. 

### 공통점
`useMemo`, `useCallback`과 마찬가지로 성능 최적화를 위해 불필요한 렌더링과 연산을 제어하는 용도로 사용됩니다.
 
### 차이점
1. `React.memo`는 HOC이고,`useMemo`, `useCallback` 는 Hook입니다.
2. `React.memo`는 클래스형 컴포넌트, 함수형 컴포넌트 모두 사용 가능하지만, `useMemo`, `useCallback` 는 Hook이기 때문에 함수형 컴포넌트 안에서만 사용 가능합니다.
3. `React.memo`는 props이 같을 시 컴포넌트 자체를 기억해 새로 그리지 않지만, `useMemo`, `useCallback`과 같은 Hook은 컴포넌트 자체가 아닌 렌더링 시 계산되는 함수 또는 값을 기억해 컴포넌트 내부 조직에서 실행됩니다.

<br />

# useMemo와 useCallback, 언제 사용하면 좋을까?
1. 계산 비용이 많이 들고, 사용자의 입력 값이 map과 filter를 사용했을 때와 같이 렌더링 이후로도 참조적으로 동일할 가능성이 높은 경우
2. 자식 컴포넌트에서 useEffect가 반복적으로 트리거되는 것을 막고싶을 때
3. 크기가 큰 리액트 트리 구조 내에서 부모가 리렌더링 되었을 때, 다른 렌더링 전파를 막고싶을 때

<br />

# ✍️ Summary

### React의 렌더링 시점
- 자신의 state가 변경될 때
- 부모 컴포넌트로부터 전달받은 props가 변경될 때
- 부모 컴포넌트가 리렌더링될 때
- `forceUpdate` 함수가 실행될 때

### UseEffect : Side Effect을 처리할 때
모든 컴포넌트가 렌더링된 후 상태변화, 구독, 타이머, 로깅 및 기타 side Effect을 처리한다.

### useCallback : 함수 재생성을 방지
Memoization된 **`함수`** 를 반환하는 함수로, 특정 함수를 새로 만들지 않고 재사용하고 싶을 때 사용한다.

### useMemo : 함수 연산량이 많을 때 이전 결과값을 재사용
useMemo는 Memoization된 **`값`** 을 반환하는 함수이다.

### React.Memo : 같은 props로 렌더링이 자주 일어날 때 이전 값을 재사용
props가 같다면, Memoizing된 내용을 재사용하는 함수로, 성능 최적화를 위해 불필요한 렌더링 또는 연산을 제어하는 용도로 사용된다.
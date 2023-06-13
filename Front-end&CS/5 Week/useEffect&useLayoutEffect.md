
<br />

> 💡 **사전 용어**
> - **Render** : DOM Tree를 구성하기 위해 각 엘리먼트의 스타일 속성을 계산하는 과정
> - **Paint** : 실제 스크린에 Layout을 표시하고 업데이트하는 과정

<br />

# useEffect

useEffect은 컴포넌트들이 `render와 paint된 후에 실행`되며, `비동기적`입니다.

paint된 후에 실행되기 때문에, useEffect 내부에 DOM에 영향을 주는 코드가 있을 경우 화면 깜빡임 현상이 발생할 수 있습니다.


**useEffect의 Life cycle**

<img src="https://velog.velcdn.com/images/haizel/post/3f875b56-b2e5-4614-9baa-a0b2ce20b8bc/image.png" width="500">


<br />

# useLayoutEffect

useLayoutEffect은 컴포넌트들이 `render된 후에 실행되며, 그 후 paint`됩니다. 즉 `동기적`으로 실행됩니다.

paint가 되기 전에 실행되기 때문에 DOM을 조작하는 코드가 존재하더라도 사용자는 깜빡임을 경험하지 않습니다.

**useLayoutEffect의 Life cycle**

<img src="https://velog.velcdn.com/images/haizel/post/3648d4de-6a7a-48c7-b2a1-621ba4847df8/image.png" width="500">


<br />

# 언제 사용하는 것이 좋을까?

## useEffect

useLayoutEffect은 동기적으로 실행되어 내부 코드가 모두 실행된 후 painting 작업을 거칩니다. 따라서 로직이 복잡할 경우 사용자가 레이아웃을 보는데까지 시간이 오래 걸린다는 단점이 있어 보통의 경우 useEffect의 사용이 권장됩니다. 대표적으로 `데이터 fetch`, `event handler`, `state reset` 의 경우 useEffect을 많이 사용합니다.

## useLayoutEffect

화면이 깜빡 거리는 상황일 때 유용합니다.

예를 들어 아래와 같이 state가 있고, 조건에 따라 첫 painting 시 다르게 렌더링 되어야 할때, useEffect은 처음에 0이 보여지고 re-rendering 되면서 화면 깜빡임 현상이 발생하지만, useLayoutEffect은 코드가 모두 실행된 후 painting 되기 때문에 화면 깜빡임 현상이 발생하지 않습니다.

```jsx
const Test = (): JSX.Element => {
  const [value, setValue] = useState(0);

  useLayoutEffect(() => {
    if (value === 0) {
      setValue(10 + Math.random() * 200);
    }
  }, [value]);

  console.log('render', value);

  return (
    <button onClick={() => setValue(0)}>
      value: {value}
    </button>
  );
};
```
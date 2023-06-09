# 1. DOM 이벤트 흐름

표준 DOM 이벤트에서 정의한 이벤트 흐름의 3단계는 다음과 같습니다.

1. **캡쳐링 단계** : 이벤트가 하위 요소로 전파되는 단계
2. **타깃 단계** : 이벤트가 실제 타깃 요소에 전달되는 단계
3. **버블링 단계** : 이벤트가 상위 요소로 전파되는 단계

![](https://velog.velcdn.com/images/haizel/post/cf797d1d-762f-41b8-b0f9-ca58b70502be/image.png)

따라서 `<td>` 를 클릭하면

1. 이벤트가 최상위 조상부터 시작해 아래로 전파되고(캡쳐링 단계)
2. 이벤트가 타깃 요소로 도착해 실행된 후(타깃 단계)
3. 다시 위로 전파(버블링 단계)됩니다.

<br />

# 2. **이벤트 버블링(Event Bubbling)**

## 이벤트 버블링이란?

`이벤트 버블링`은 한 요소에 이벤트가 발생해 요소에 할당된 핸들러가 동작하면 → 이어 부모 요소의 핸들러가 동작하고 → 가장 최상단에 위치한 부모요소를 만날때까지 이 과정이 반복되면서 요소 각각에 할당된 핸들러가 동작하는 것을 의미합니다.

이벤트가 제일 깊은 곳에 있는 요소부터 시작해 부모 요소를 거슬러 올라가며 발생하는 모양이 마치 물속 거품, 즉 버블과 닮아 **이벤트 버블링**이라고 부릅니다.

![](https://velog.velcdn.com/images/haizel/post/b94f9e23-04d6-4dec-8532-4c19c49a40c7/image.png)

## 이벤트 버블링 원리

- 3개의 요소가 `FORM > DIV > P` 형태로 중첩된 구조가 있고, 각 요소에 핸들러가 할당되어 있다.

```jsx
<form onclick="alert('form')">
  FORM
  <div onclick="alert('div')">
    DIV
    <p onclick="alert('p')">P</p>
  </div>
</form>
```

![](https://velog.velcdn.com/images/haizel/post/3c69dbb4-8c0a-4330-8289-4b7740807a4d/image.png)
가장 안쪽의 `<p>` 요소를 클릭하면,

1. `<p>`에 할당된 onclick **핸들러**가 동작하고
2. 상위요소 `<div>`에 할당된 onclick **핸들러**가 동작합니다.
3. 연이어 상위요소 `<form>`에 할당된 onclick **핸들러**가 동작합니다.
4. 이벤트 버블링은 `document` 객체를 만날 때까지, 각 요소에 할당된 onclick **핸들러**가 동작합니다.
   <br />

<br />

💡 **`document` 객체란?**

- DOM 트리 최상단 객체를 말합니다.
  ![](https://velog.velcdn.com/images/haizel/post/7dc6104a-7e3e-4c37-b44c-d7692b685bfb/image.png)

<br />

> 💡 **모든 이벤트는 버블링 될까 ?**

- `focus` 이벤트와 같이 몇몇 이벤트를 제외한 대부분의 이벤트는 버블링된다.

<br />

# 3. 이벤트 버블링 중단하기

원하는 요소에서만 이벤트를 발생하게 하고 싶다면, `event.stopPropagation()`를 통해 버블링을 중단할 수 있습니다. 이를 사용하면 클릭한 타깃의 이벤만 발생하고 상위 요소로 이벤트가 전파되는 것을 막아줍니다.

```jsx
<form onclick="alert('버블링은 여기까지 도달하지 못합니다")">FORM
  <div onclick="event.stopPropagation()">클릭해주세요.</div>
</form>
```

<br />

> 💡 **한 요소의 이벤트 핸들러가 두개라면?**
> 한 요소의 특정 이벤트를 처리하는 핸들러가 여러개라면, `event.stopPropagation()`를 통해 하나의 핸들러의 버블링을 멈추더라도 나머지 핸들러는 여전히 동작합니다.
>
> 즉, `event.stopPropagation()` 는 상위로 일어나는 버블링은 막아주지만, 같은 요소에 할당된 다른 핸들러들이 동작하는 건 막지 못합니다.
>
> 따라서 상위로 일어나는 버블링을 중단하고, 같은 요소에 할당된 다른 핸들러의 동작도 막으려면 `event.stopImmediatePropagation()`를 사용하면 된다. 이 메서드를 사용하면 해당 요소에 할당된 이벤트를 처리하는 모든 핸들러의 동작이 중단된다.

<br />

> ❓ **이벤트 버블링 중단, 올바른가?**
>
> A. 버블링은 매우 유용하므로, 버블링을 꼭 멈춰야 하는 상황이 아니라면 버블링을 막지 않는 것이 좋다.

- `event.stopPropagation()`을 사용한 영역은 ‘죽은 영역(Dead Zone)’이 되어버리기 때문입니다.
- 불가피하게 버블링을 막아야한다면, 해당 메서드 대신 커스텀 이벤드 등을 사용해 이벤트 버블링을 통제하는 것이 권장됩니다.

<br />

# 4. [event.target](http://event.target)과 event.currentTarget

이벤트가 발생한 가장 안쪽 요소는 **_타깃(target)요소_** 라고 불리고, `event.target`을 사용해 접근할 수 있다.

- `event.target` : 실제 이벤트가 시작된 ‘타깃’요소를 말하며, 버블링이 진행되어도 타깃 요소는 변하지 않습니다.
- `this(=event.currentTarget)` : ‘현재’ 요소로, 현재 실행 중인 핸들러가 할당된 요소를 참조합니다.

![](https://velog.velcdn.com/images/haizel/post/c8e17211-263f-4c62-8d64-bad8b1c77631/image.png)

위 구조에서 `<p>` 요소의 onClick 이벤트 핸들러를 동작시킨다면,

- `event.target` : 실제 클릭한 요소인 **`<p>` 요소**
- `this(=event.currentTarget)` : `<form>`요소에 있는 핸들러가 동작했기 때문에 **`<form>`요소**를 가리킨다.

<br />

# 5. **이벤트 캡처링(Event Capturing)**

캡처링은 버블링과 반대로 최상위 태그에서 해당 태그를 찾아 내려가는 현상을 말합니다

![](https://velog.velcdn.com/images/haizel/post/29f09ba8-ee04-48b4-932c-59aacb284bc8/image.png)

## 이벤트 캡처링 원리

- `addEventListener` 의 옵션 객체에 `{ capture: true }` 또는 `true` 를 설정해 캡쳐링 구현할 수 있습니다.

`<div class="DIV3">DIV3</div>`를 클릭하면 최상위 부모요소부터 탐색해 내려오기 때문에 콘솔에 DIV1 → DIV2 → DIV3이 순서대로 찍히게 됩니다.

```jsx
<body>
  <div class="DIV1">
    DIV1
    <div class="DIV2">
      DIV2
      <div class="DIV3">DIV3</div>
    </div>
  </div>
</body>;

const divs = document.querySelectorAll("div");

const clickEvent = (e) => {
  console.log(e.currentTarget.className);
};

divs.forEach((div) => {
  div.addEventListener("click", clickEvent, { capture: true });
});
```

# 궁금증

### 1. 이벤트 버블링이 마우스 클릭 외에 어떤 경우에 나타나나요?

- A : 키보드 이벤트, 마우스 이벤트, HTML 이벤트 등 모든 이벤트
- e.g. Mouse : click, mouseover / Keyboard : keydown, keyup etc. / HTML : load, unload etc.

### 참고

- [이벤트 캡쳐링과 버블링 알아보기](https://www.howdy-mj.me/dom/event-capturing-and-bubbling)

## 👮🏻‍♂️ Strict 모드

ES5에 처음 추가된 개념으로, 자바스크립트 코드에 더욱 엄격한 오류 검사를 적용하는 키워드입니다. 스크립트나 함수의 맨 처음에 `“use strict”` 지시어를 사용해 선언할 수 있습니다.

```jsx
/* 스크립트에서 strict 선언 */
"use strict";
let start = "Hi! I'm a strict mode script!";

/* 함수에서 strict 선언 */
function strict() {
	"use strict";
	return  "Hi! I'm a strict mode script!";
}
```

<br />

## 👮🏻‍♂️ Strict 모드의 이점

엄격모드에서는 이전에 통용되던 행동들을 제약합니다. 또한 몇 가지 중요한 기능을 수정하여 강력한 오류 검사와 함께 향상된 보안 기능을 제공합니다. 대표적인 이점은 다음과 같습니다.

1. 기존에는 무시되던 에러들을 throwing 합니다.
2. JavaScript 엔진의 최적화 작업을 어렵게 만드는 실수들을 바로 잡습니다. 
    - 때문에 엄격 모드로 작성된 코드는 동일하게 작성된 기존의 코드보다 더 빨리 작동하기도 합니다.

<br />

## 👮🏻‍♂️ Strict 모드의 특징

### 1. 선언되지 않은 전역 변수를 사용할 수 없다.
<img src="https://velog.velcdn.com/images/haizel/post/ad19d7a9-e65a-46ff-b809-8655ef2ce871/image.png" width="400" />

### 2. 읽기 전용 프로퍼티에는 대입할 수 없다.

writable이 false로, 읽기 전용 객체에 쓰는 것이 불가능합니다. (read only 객체 수정 불가능)

<img src="https://velog.velcdn.com/images/haizel/post/af48532e-32a8-425a-99b9-929bb36029e1/image.png" width="400" />


### 3. 매개변수 이름이 중복되어서는 안된다.
<img src="https://velog.velcdn.com/images/haizel/post/4ffa26a8-8913-4f69-abfd-7478cadf29b5/image.png" width="400" />

### 4. this 포인터가 가리키는 값이 null, undefind인 경우 전역 객체로 반환되지 않는다.

this의 결과가 null, undefind인 경우, 전역객체 window를 반환하지 않고 그대로 반환하게 됩니다.

<img src="https://velog.velcdn.com/images/haizel/post/1b494f1c-e785-48a8-81e4-21d673385643/image.png" />

### 5. 예약어를 사용할 수 없다.

예약된 키워드의 이름으로 변수 또는 함수를 생성할 수 없습니다.

<img src="https://velog.velcdn.com/images/haizel/post/c0acc606-29cd-4017-b91f-5dfb35b45b1b/image.png" />

<br />

## 👮🏻‍♂️ strict 모드의 주의점 및 궁금점

### ⚠️ 1. `"use strict"`은 반드시 최상단에 위치해야한다.

스크립트나 함수의 최상단에 위치하지 않으면 엄격 모드는 활성화되지 않습니다.

```jsx
alert("some code");
// 하단에 위치한 "use strict"는 스크립트 상단에 위치하지 않으므로 무시됩니다.

"use strict";
// 엄격 모드가 활성화되지 않습니다.
```

### ⚠️  `"use strict"` 은 취소할 수 없다.

자바스크립트 엔진을 이전 방식으로 되돌리는 `“no use strict”`과 같은 지시자는 존재하지 않습니다. 즉, 엄격 보드가 적용되면 돌이킬 방법은 없습니다.

### ⚠️  `"use strict"` 를 꼭 사용해야 하는가?

모듈과 클래스에는 `"use strict"` 이 자동 적용된다. 따라서 이들을 통해 코드를 구성할 시 `"use strict"` 은 생략 가능하다. 그 밖에도 작성하는 코드의 성격에 따라 적용 혹은 생략할 수 있다.

<br />

## 👮🏻‍♂️ React의 **strict 모드**

React에서 strict 모드는 어떤 이점이 있을까?

### 1. 안전하지 않은 생명주기를 사용하는 컴포넌트를 발견한다.

비동기 React 애플리케이션에서 특정 생명주기 메서드들은 안전하지 않습니다. 
`Strict Mode`가 활성화되면, React는 안전하지 않은 생명 주기 메서드를 사용하는 모든 클래스 컴포넌트 목록을 정리해 다음과 같이 컴포넌트에 대한 정보가 담긴 경고 로그를 출력합니다.

<img src="https://velog.velcdn.com/images/haizel/post/8c807cb8-57b1-4d23-830f-2376b701d255/image.png"  width="400" />

### 2. 레거시 문자열 ref 사용에 대한 경고

이전의 React에서 ref를 관리하는 방법으로 `레거시 문자열 ref API`와 `콜백 API`, 두가지 방법을 제공했습니다. `문자열 ref API` 는 사용하기 더 편리하지만 몇몇 단점들이 존재해 공식적으로는 콜백 형태를 사용하는 것을 권장하고 있습니다. 

`Strict Mode`가 활성화되면, `레거시 문자열 ref API` 사용에 대한 경고를 띄웁니다.

### 3. 권장되지 않은 fineDOMNode 사용에 대한 경고

`fineDOMNode` 는 클래스 컴포넌트에서 사용하면 부모다 특정 자식이 렌더링되는 것을 요구하는 상황이 허용되어 추상화 레벨이 무너질 수 있는 문제점을 야기시킵니다. `Strict Mode` 는 이처럼 권장되지 않은  fineDOMNode 사용에 대한 경고를 띄웁니다.

> `fineDOMNode` : 주어진 클래스 인스턴스를 바탕으로 트리를 탐색해 DOM 노드를 찾을 수 있음.

### 4. 예상치 못한 부작용 검사

`Strict Mode` 는 부작용을 일으킬 수 있는 메서드들을 의도적으로 이중으로 호출해, 문제가 되는 부분을 발견할 수 있게 도와줍니다.

이를 통해 메모리 누수 혹은 잘못된 애플리케이션 상태 등 다양한 문제를 일으킬 가능성을 줄여줍니다,

### 5. 레거시 context API 검사

레거시 context API는 오류가 발생하기 쉬워 이후 릴리즈에서 삭제될 예정입니다. 모든 16.x 버전에서 여전히 돌아가지만, Strict 모드에서는 아래와 같은 경고 메시지를 노출합니다.

<img src="https://velog.velcdn.com/images/haizel/post/e300a777-ed76-4ed9-bdd8-4920d3e8261a/image.png"  width="400"/>
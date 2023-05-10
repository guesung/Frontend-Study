## DOM

### DOM 이란?

- DOM은 HTML 문서의 계층적 구조와 정보를 표현하며 이를 제어할 수 있는 API를 제공하는 트리 자료구조다.
- 브라우저 렌더링 엔진이 HTML 문서를 파싱하여 브라우저가 이해할 수 있는 자료구조인 DOM을 생성한다.

## 노드

### HTML 요소와 노드 객체

```jsx
<div class="greeting">Hello</div>
```

- HTML 요소는 HTML 문서를 구성하는 개별적인 요소를 의미한다.
- div → 태그, class → 어트리뷰트 이름, greeting → 어트리뷰트 값, Hello → 콘텐츠
- HTML 요소의 어트리뷰트는 어트리뷰트 노드로, HTML 요소의 텍스트 콘텐츠는 텍스트 노드로 변환된다.

### 노드 객체 타입

- 문서노드
    - DOM 트리의 최상위에 존재하는 루트 노드로 document 객체를 가르킴
    - HTML 문서당 document 객체는 유일함
- 요소노드
    - HTML 요소를 가리키는 객체
    - 부모노드와 연결
    - 문서의 구조를 표현
- 어트리뷰트 노드
    - HTML 요소의 속성을 가리키는 객체
    - 어트리뷰트 노드는 부모노드와 연결되어 있지 않음
    - 요소의 속성을 변경 시 요소노드에 먼저 접근

- 텍스트 노드
    - HTML 요소의 텍스트를 가리키는 객체
    - 문서의 정보 표현
    - 리프 노드
    

이외에도 Comment 노드, DocumentType 노드, DocumentFragment 노드 등 12개의 노드 타입이 존재한다.

- DocumentFragment
    - 부모 노드가 없이 기존 DOM과 별도로 존재함 (메모리 상에만 따로 존재)
    - DocumentFragment 노드를 DOM에 추가해도 기존 DOM에는 어떠한 변경도 발생하지 않음
    - DOM에 추가하면 자신은 제거 되고 자신의 자식 노드만 DOM에 추가됨

### 노드 객체의 상속 구조

- DOM은 HTML 문서의 계층적 구조와 정보를 표현하고, 노드 타입에 따라 필요한 기능을 DOM API(프로퍼티와 메서드 집합)로 제공한다.
- DOM API로 DOM의 구조와 정보를 제어할 수 있다.
- 노드 객체는 자신의 부모, 형제, 자식을 탐색할 수 있고, 자신의 어트리뷰트와 텍스트를 조작할 수 있다.

## 요소 노드 취득

### id 이용

- Document.prototype.getElementById 메서드는 인수로 전달한 id 값을 갖는 하나의 요소 노드를 탐색해 반환한다.
- id 값은 HTML 문서 내에서 유일한 값이어야 한다.

### 태그 이름 이용

- Document.prototype.getElementsByTagName 메서드는 인수로 전달한 태그 이름을 갖는 모든 요소 노드들을 탐색해 반환한다.
- 여러 개의 요소 노드 객체를 갖는 DOM 컬렉션 객체인 HTMLCollection 객체를 반환한다.

### class 이용

- Document.prototype.getElementsByClassName 메서드는 인수로 전달한 class 어트리뷰트 값을 갖는 모든 요소 노드들을 탐색해 반환한다.
- HTMLCollection 객체를 반환한다.

### CSS 선택자 이용

- 스타일을 적용하고자 하는 HTML 요소를 특정할 때 사용하는 문법이다.
- Document.prototype.querySelector 메서드는 인수로 전달한 CSS 선택자를 만족시키는 하나의 요소 노드를 탐색해 반환한다.
- Document.prototype.querySelectorAll 메서드는 인수로 전달한 CSS 선택자를 만족시키는 모든 요소 노드를 탐색해 반환하고, 여러 개의 요소 노드 객체를 갖는 DOM 컬렉션 객체인 NodeList 객체를 반환한다.

### getElementById vs querySelector

- querySelector가 getElementById 보다 다소 느린 것으로 알려져 있다.
- CSS 선택자 문법을 사용하면 좀 더 구체적인 조건으로 요소 노드를 취득할 수 있다.
- id 어트리뷰트가 있는 요소 노드를 취득하는 경우에는 getElementById 메서드를 사용하고, 그 이외는 querySelector 메서드를 사용하는 것을 권장한다.

### HTMLCollection과 NodeList

- HTMLCollection과 NodeList는 DOM API가 여러 개의 결과 값을 변환하기 위한 DOM 컬렉션 객체다. 유사 배열 객체이면서 이터러블이다.
- HTMLCollection은 언제나 노드 객체의 상태 변화를 실시간으로 반영하는 객체로 동작한다.
- NodeList는 대부분의 경우 노드 객체의 상태 변화를 실시간으로 반영하지 않고 과거의 정적 상태를 유지하는 방식으로 동작하지만, 경우에 따라 실시간으로 반영하는 객체로 동작할 때가 있다.

## 요소 노드의 텍스트 조작

### nodeValue

- Node.prototype.nodeValue는 노드 객체의 값을 반환한다.

### textContent

- Node.prototype.textConent 프로퍼티는 요소 노드의 텍스트와 모든 자손 노드의 텍스트를 모두 취득하거나 변경한다.
- 반환 시 HTML 마크업은 무시된다.
- textContent 프로퍼티와 유사한 동작을 하는 innerText 프로퍼티는 CSS에 순종적이고 느려 사용하지 않는 것이 좋다.

## DOM 조작

### DOM 조작

- 새로운 노드를 생성하여 DOM에 추가하거나 기존 노드를 삭제 또는 교체하는 것이다.
- 이 과정에서 리플로우와 리페인트가 발생한다.

### innerHTML

- Element.prototype.innerHTML 프로퍼티는 요소 노드의 HTML 마크업을 취득하거나 변경한다.
- 요소 노드의 시작 태그와 종료 태그 사이의 모든 HTML 마크업을 문자열로 반환한다.
- HTML 마크업 문자열은 렌더링 엔진에 의해 파싱되어 DOM에 반영된다.
- 이때, 사용자로 부터 입력 받은 데이터를 innerHTML 프로퍼티에 할당하는 것은 XSS(크로스 사이트 스크립트 공격)에 취약해 위험하다.
- 새로운 요소를 삽입할 때 자식 노드까지 모두 제거하고 새롭게 자식 노드를 생성하여 DOM에 반영하고, 삽입 위치를 지정할 수 없다.

### insertAdjacentHTML

- Element.prototype.insertAdjacentHTML 메서드는 기존 요소를 제거하지 않으면서 위치를 지정해 새로운 요소를 삽입한다.
- XSS 공격에 취약한 것은 innerHTML 프로퍼티와 동일하다.

### 노드 생성과 추가

- 요소 노드 생성 → Document.prototype.createElement
- 텍스트 노드 생성 → Document.prototype.createTextNode
- 노드 추가 → Node.prototype.appendChild, Node.prototype.insertBefore(newNode, childNode)

## 참고
자바스크립트 딥 다이브 39장 DOM

https://tillog.netlify.app/posts/document-fragment

https://blog.naver.com/kjhgngjgk/222933521160

https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model/Introduction

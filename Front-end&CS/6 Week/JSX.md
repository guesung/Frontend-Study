## 💡 JSX란?

JavaScript XML(eXtensible Markup Language)의 약어로, **JavaScript에 XML을 추가한 확장된 문법**입니다. 


1. **보기 쉽고 익숙하다.**
    - JSX는 HTML 코드와 비슷하기 때문에 일반 자바스크립트만 사용한 코드보다 더 익숙하고 간결하며 가독성이 좋습니다.
2. **높은 활용도**
    - JSX에서는 div, span과 같은 HTML 태그를 사용할 수 있으며, 개발자가 만든 컴포넌트도 JSX 안에서 작성할 수 있습니다.
    
<br />

## 💡 JSX 문법 규칙

1. **요소가 하나 이상이라면, 반드시 부모 요소로 감싸는 형태여야 합니다.**

Virtual DOM에서 컴포넌트 변화를 감지할 때 효율적으로 비교할 수 있도록 컴포넌트 내부는 하나의 DOM Tree 구조로 이루어져야 한다는 규칙이 있기 때문입니다.

```jsx
function App() {
	return (
		<div>
			<div>Hello!</div>
			<div>World!</div>
		</div>
	)
}
```

2. **자바스크립트 표현식**

JSX 안에서도 자바스크립트 표현식을 사용할 수 있습니다. JSX 내부에서 코드를 `{ }`로 감싸주면 됩니다.

```jsx
import React from 'react';

// 자바스크립트 표현
function App(){
	const name = 'react';
	return(
    	<>
          <h1>Hello! {name}</h1>
          <h2>Is it working well?</h2>
        <>
    )
}

export default App;
```

3. **삼항 연산자(조건 연산자) 사용**

`if문`과 `for 루프`는 JavaScript 표현식이 아니기 때문에 JSX 내부의 자바스크립트 표현식에서 사용할 수 없습니다. 대신 JSX 밖에서 if 문을 사용하거나 `{ }` 안에서 삼항 연산자(조건부 연산자)를 사용할 수 있습니다.

```jsx
//1. 외부에서 사용
function App() {
	let desc = '';
	const loginYn = 'Y';
	if(loginYn === 'Y') {
		desc = <div>GodDaeHee 입니다.</div>;
	} else {
		desc = <div>비회원 입니다.</div>;
	}
	return (
		<>
			{desc}
		</>
	);
}

//2. 삼항 연산자 사용
function App() {
	const loginYn = 'Y';
	return (
		<>
			<div>
				{loginYn === 'Y' ? (
					<div>GodDaeHee 입니다.</div>
				) : (
					<div>비회원 입니다.</div>
				)}
			</div>
		</>
	);
}
```

4. **`CamelCase` 표기법으로 작성**

JSX는 HTML보단 JavaScript에 가깝기 때문에 React DOM은 HTML 어트리뷰트 이름 대신 `CamelCase` 프로퍼티 명명 규칙을 사용합니다.

또한 JSX 내부에서 스타일을 설정할 때는 String 형식이 아닌 Key가 카멜 표기법으로 작성된 객체 형태로 넣어주어야 합니다.

```jsx
/*
background-color → backgroundColor
font-size → fontSize
*/

function App() {
	const style = {
		backgroundColor: 'green',
		fontSize: '12px'
	}
	return (
		<div style={style}>Hello, GodDaeHee!</div>
	);
}
```

- JSX에서 자바스립트 문법을 쓰려면 `{ }`를 써야합니다.
5. **class 대신 className**

일반 HTML에서 CSS 클래스를 사용할 땐 class 속성을 사용하지만, JSX에서는 className을 사용합니다.

<br />


## 💡 브라우저는 어떻게 JSX → JS로 변환할까 ?
<img src="https://velog.velcdn.com/images/haizel/post/bf98e2ae-3a9e-4237-9549-2a02e1e435bc/image.png" width="400" height="200">

브라우저는 JSX를 이해하지 못하기 때문에 JSX 코드를 JavaScript 코드로 변환하는 과정이 필요합니다. JSX를 JS로 변환하기 위해 바벨(Babel)과 같은 컴파일러를 사용합니다.

> `바벨(Babel)` : 대표적인 트렌스파일러로, 특정 언어로 작성된 코드를 비슷한 다른 언어로 변환시키는 역할을 수행합니다.
> 

바벨은 JSX를 JavaScript로 변환하는데 사용되는 가장 일반적인 도구로, 바벨을 사용하면 JSX를 JavaScript 코드로 변환하고 이를 브라우저에서 실행할 수 있도록 컴파일합니다.

```jsx
//JSX
function App() {
  return (
  	<div>
    	Hello <b>react</b>
    </div>
  );
}

//JavaScript로 변환되었을 때의 모습
function App() {
  return React.createElement("div", null, "Hello ", React.createElement("b", null, "react"));}

```

이렇게 바벨을 사용하여 JavaScript로 변환하면, React에서 작성한 UI 구성 요소를 일반적인 JavaScript 코드로 컴파일하여 브라우저에서 실행할 수 있습니다.

## 💡 `.js` vs `.jsx` ?

### `.js`  Side

> `.js` 와 `.jsx` 는 확장자로서 차이점은 없으나, jsx가 표준 자바스크립트 문법이 아닌 만큼, plain 하지 않은 자바스크립트가 js파일에 들어가 있는 것에 대한 논쟁이 있을 수 있습니다.
>
> 따라서 팀 내 convention 협의 시 js 또는 jsx를 쓸 것인지 협의가 필요합니다.
> 
> **근거 :** [stackOverflow](https://stackoverflow.com/questions/46169472/reactjs-js-vs-jsx)

### `.jsx`  Side

> React에서 JSX 사용이 필수는 아니지만, JSX는 Javascript 코드 안에서 UI 관련 작업을 할 때 시각적으로 더 도움이 됩니다 또한 개발에 더 도움을 주는 에러 및 경고 메세지를 표시할 수 있게 해줍니다.
>
> **근거 :** [React 공식문서](https://ko.legacy.reactjs.org/docs/introducing-jsx.html)
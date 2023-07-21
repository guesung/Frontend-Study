# CSR과 SSR

## CSR?

- CSR(Cliend Side Rendering) : 렌더링이 클라이언트 측에서 일어남

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FkFsCv%2FbtrE6zccPL3%2F3918efAnS6kWmSh6v1sk4K%2Fimg.png' width='400'/>

1. 서버가 브라우저에게 HTML, JS, CSS를 보냄
2. 브라우저가 HTML을 파싱하고, JS, CSS를 다운로드 함
   - 이 때 HTML은 \<div id='root'>\</div>같이 빈 태그임
   - 아직 빈 화면이고, 상호작용 불가능
3. JS가 다운로드되고 실행되며 데이터를 위한 API 호출
4. API로부터 받아온 Data를 \<div id='root'>\</div>에 넣어줌
   - 이제 화면을 볼 수 있고, 상호작용도 가능

## SSR

- SSR(Server Side Rendering) : 서버쪽에서 렌더링 준비를 마친 상태로 클라이언트에 전달
- 작동 순서

  1. User가 Website 요청을 보냄.
  2. Server는 'Ready to Render'. 즉, 즉시 렌더링 가능한 html파일을 만든다.
     (리소스 체크, 컴파일 후 완성된 HTML 컨텐츠로 만든다.)
  3. 클라이언트에 전달되는 순간, 이미 렌더링 준비가 되어있기 때문에 HTML은 즉시 렌더링 된다.

     그러나 사이트 자체는 조작 불가능하다. (Javascript가 읽히기 전이다.)

  4. 클라이언트가 자바스크립트를 다운받는다.
  5. 다운 받아지고 있는 사이에 유저는 컨텐츠는 볼 수 있지만 사이트를 조작 할 수는 없다. 이때의 사용자 조작을 기억하고 있는다.
  6. 브라우저가 Javascript 프레임워크를 실행한다.
  7. JS까지 성공적으로 컴파일 되었기 때문에 기억하고 있던 사용자 조작이 실행되고 이제 웹 페이지는 상호작용 가능해진다.

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FIaz3s%2FbtrE4c2LwKn%2FRpYcCmhW3Ak9D9Okk9sUk0%2Fimg.png' width='400' />

1. 서버는 렌더링 가능한 html파일을 만들어 보냄
2. 브라우저는 페이지를 렌더링
   - 볼 수 있지만, 상호작용은 불가능
3. JS를 다운로드하고, JS 프레임워크 실행
4. JS까지 성공적으로 컴파일 됨
   - 볼 수 있고, 상호작용도 가능

### CSR vs SSR

1. 웹페이지 로딩하는 시간

   - 첫 페이질 로딩 시간 : SSR > CSR보다 빠름
     - CSR : HTML, CSS, JS를 한 번에 불러옴
     - SSR : 필요한 부분의 HTML과 JS만 불러옴
   - 나머지 로딩 시간 : CSR이 SSR보다 빠름
     - CSR : 이미 첫 페이지 로딩할 때 나머지 부분을 구성하는 코드를 받아옴
     - SSR : 첫 페이지 로딩한 과정을 다시 실행(서버에 요청)

2. SEO 대응

   - SSR > CSR
   - 검색 엔진 : 자동화된 로봇 '크롤러'로 웹 사이트를 읽음
   - CSR : JS가 실행되기 전까지는 빈 페이지이기 때문에 크롤러가 읽을 수 없음
   - SSR : 이미 렌더링된 페이지를 읽을 수 있음

3. 서버 자원 사용

   - SSR > CSR : 매번 서버에 요청

### 결론

- CSR : 네트워크가 빠르고, 서버의 성능이 좋지 않을 때 사용할 수 있으며, 웹 어플리케이션에서 사용자와 상호작용할 것들이 많을 때나 사용자에게 보여줘야 하는 데이터의 양이 많을 때 로딩창을 띄울 수 있음
- SSR : 각 페이지마다 나눠 불러오므로 네트워크가 느리거나, SEO가 필요할 때 사용할 수 있음. 상호작용이 별로 없다면 SSR을 적합

---

## SPA (=CSR)

- SPA(Single Page Application) : 1개의 page로 이루어진 애플리케이션
- 웹 애플리케이션에 필요한 모든 정적 리소스를 최초 한 번에 다운로드
- 이후부터는 필요한 부분만 변경하여 갱신
- e.g. Angular, React, Vue

<img src='https://i0.wp.com/hanamon.kr/wp-content/uploads/2021/03/SPA.png?resize=768%2C415&ssl=1' width=400 />

### React Router

- 경로에 따라 다른 뷰를 보여 줌

1. BrowserRouter : 컴포넌트의 최상위에 작성되어 React Router의 컴포넌트 활용
2. Routes와 Route : 경로에 따라 다른 컴포넌트를 보여주는 역할
3. Link : 경로를 이동하는 역할. \<a>태그와 비슷하지만 페이지 전체를 새로고침하지 않고 필요한 부분만 업데이트

```jsx
<BrowserRouter>
  <div>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/mypage">MyPage</Link>
        </li>
      </ul>
    </nav>
  </div>

  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/mypage" element={<MyPage />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="*" element={<NotRightPath />} />
  </Routes>
</BrowserRouter>
```

### SPA 단점

1. 앱의 규모가 커지면 JS 파일이 너무 커짐 (페이지 로딩 시 실제 사용자가 방문하지 않을 수도 있는 페이지의 스크립트도 불러옴)
2. SEO, 크롤러가 페이지 정보를 수집하지 못하여 페이지 검색이 힘듬 -> 대형 포털 사이트에 검색 안될 경우도 있음
   - React의 경우 index.html파일에 <div id='root'></div>가 있고, 이곳에 React가 렌더링되는데, 이렇게 되면 검색엔진이 index.html만 수집하고, 그 안에 있는 React는 수집하지 못함

## MPA(= SSR)

- MPA(Multiple Page Application) : 여러 개의 page로 구성된 Application
- 새로운 페이지를 요청할 때마다 정적 리소스(HTML,CSS,JS)가 다운로드 됨
- 페이지 이동하거나 새로고침하면 전체 페이지 다시 렌더링
- e.g. Next.js(React.js 프레임워크), Nuxt.js(Vue.js 프레임워크)

<img src='https://i0.wp.com/hanamon.kr/wp-content/uploads/2021/03/MPA.png?resize=768%2C415&ssl=1' width=400>

## Universal Rendering

- 위 3가지 방식을 장점 위주로 섞어 놓은 형태
- 웹사이트를 보여주기 위해 필수적인 HTML, CSS파일은 웹 서버에서 처리하고, 사용자의 상호작용을 처리하기 위한 JS 파일은 CDN(Content Delivery Paint)에 배포 => HTML, CSS만 먼저 보내 FCP(First Contentful Pain)시간을 단축시키고, 나중에 JS 파일을 통해 사용자 상호작용을 활성화 = Hydration(수화) 방식
- e.g. Next.js

<img src='https://velog.velcdn.com/images/gwak2837/post/e64a0cef-9a01-40b7-81c8-fa593005e918/image.png' width=400 />

### 참고

[SPA란?](https://velog.io/@hongduhyeon/React-SPA)

[CSR vs SSR 특징 및 차이](https://hahahoho5915.tistory.com/52)

[CSR vs SSR 차이](https://velog.io/@hanei100/TIL-SSR-vs-CSR-%EC%B0%A8%EC%9D%B4)

[SPA vs MPA와 SSR vs CSR 장단점 뜻정리](https://hanamon.kr/spa-mpa-ssr-csr-%EC%9E%A5%EB%8B%A8%EC%A0%90-%EB%9C%BB%EC%A0%95%EB%A6%AC/)

[CSR과 SSR 차이](https://proglish.tistory.com/216)

[Next.js 페이지 렌더링 이해하기](https://velog.io/@gwak2837/Next.js-%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0)

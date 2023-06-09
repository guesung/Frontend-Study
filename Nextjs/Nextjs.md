# Next.js

### Intro

Next.js를 쓰는 가장 큰 이유는 SSR때문이다. 그 외에도 Code splitting 지원, Image Optimazation, Pre-fetching과 같은 유용한 기능을 제공한다.

Next.js 공식 홈페이지에서도 가장 먼저 강조하는 것이 'Hybrid static & Server rendering'이라고 나와있다. 그렇다면, Next.js는 SSR을 어떤 과정을 거쳐 렌더링 되는 것일까?
그 전에 앞서 [CSR, SSR](https://proglish.tistory.com/216)을 선행해야 한다.

## Next.js의 렌더링(Hydrate)

- 모든 페이지를 서버 측에서 미리 렌더링 -> 해당 페이지에 필요한 최소한의 JS코드와 연결
- HTML이 생성되는 시점
  1. SSG(Static Site Generation) : 빌드 타임에 HTML에 생성되어 매 요청마다 이를 재사용
     - 정적인 페이지를 미리 생성하여 SEO에 유리
     - 블로그, 포트폴링, 메뉴얼 등 데이터가 바뀌지 않는 데이터에 적합
  2. SSR(Server Side Rendering) : 매 요청마다 HTML을 생성
     - 유저의 요청마다 데이터가 변경될 수 있는 맞춤 추천 리스트, 장바구니 페이지 등에 적합

### Hydration

: Server Side단에서 렌더링 된 정적 페이지와 번들링된 js파일(Webpack)을 클라이언트에게 보낸 뒤, 클라이언트 단에서 HTML 코드와 React인 js 코드를 서로 매칭시키는 과정

- React는 CSR(Client-side Rendering)로, 처음에 브라우저가 빈 HTML을 파일을 받아 아무것도 보여주지 않다가, 사용자의 기기에서 `렌더링이 진행되어 한 번에 화면을 보여줌`

  <img src='https://nextjs.org/static/images/learn/foundations/client-side-rendering.png' width=400 />

- Next.js는 서버 측에서 모든 페이지를 미리 렌더링하여 HTML을 생성하고, 브라우저에 전달 -> 해당 페이지에 필요한 최소한의 JS코드와 연결. 이 과정이 바로 hydration

  <img src='https://nextjs.org/static/images/learn/foundations/pre-rendering.png' width=400>

## Next.js의 기능

1. hot reloading : 개발 중 저장되는 코드는 자동으로 새로고침
2. automatic routing : pages폴더에 있는 파일은 해당 파일 이름으로 라우팅

   - public폴더도 pages폴더와 동일하게 라우팅 가능

3. single file components : style jsx를 사용함으로 컴포넌트 내부에 해당 컴포넌트만 스코프를 가지는 css만들 수 있음

   ```jsx
   // styled-jsx

   function Heading(props) {
     const variable = "red";
     return (
       <div className="title">
         <h1>{props.heading}</h1>
         <style jsx>
           {`
             h1 {
               color: ${variable};
             }
           `}
         </style>
       </div>
     );
   }

   export default function Home() {
     return (
       <div>
         // red
         <Heading heading="heading" />
         // block
         <h1>ttt</h1>
       </div>
     );
   }
   ```

4. 글로벌 스타일 정의 가능 : \_app에서만 사용 가능

   ```jsx
   // pages/_app.js
   import "../styles/global.css";

   export default function App({ Component, pageProps }) {
     return <Component {...pageProps} />;
   }
   ```

5. Server landing : SSR(Server Side Rendering), SSG(Static Site Genration) 제공

   - `getServerSideProps` : 페이지가 요청될 때마다 서버에서 실행
   - `getStaticProps` : 페이지가 요청될 때마다 서버에서 실행되는 것이 아닌, 빌드 시점에 한 번만 실행되어 생성된 HTML에 포함
   - `getStaticPaths` : 동적 라우팅을 위해 사용

6. code splitting : 내가 원하는 페이지에서 원하는 JS와 라이브러리 렌더링

   - JS를 각 경로에 대해 별도의 청크로 분할
   - 사용자가 애플리케이션을 로드하면 Next.js는 초기 경로에 필요한 코드만 전송
   - 각 가져오기를 별도의 청크로 로드할 수 있는 동적 import를 지원
     - `dynamic(import(".."));`
   - 동적 가져올 때, dynamic()함수에 추가 인수를 제공하여 로드 표시기 제공할 수 있음

7. typescript : 기본적으로 typescript를 지원

8. \_document.tsx : meta 태그 정의하거나, 전체 페이지 관리
   - console은 서버에서만 보이고 클라이언트에서는 안보임
   ```tsx
   // pages/_document.tsx
   import Document, { Html, Head, Main, NextScript } from "next/document";
   export default class CustomDocument extends Document {
     render() {
       return (
         <Html>
           <Head>
             // 모든페이지에 아래 메타테크가 head에 들어감 // 루트파일이기에
             가능한 적은 코드만 넣어야함 전역 파일을 엉망으로 만들면 안된다 //
             웹 타이틀, ga 같은것 넣음
             <meta property="custom" content="123123" />
           </Head>
           <body>
             <Main />
           </body>
           <NextScript />
         </Html>
       );
     }
   }
   ```
9. \_app.tsx : 이곳에서 렌더링 하는 값은 모든 페이지에 영향을 줌

   - \_app.tsx는 최초 실행되며 내부에 컴포넌트들 실행
   - 내부에 컴포넌트가 있다면 전부 실행하고 html의 body로 구성
   - `Component`, `pageProps`를 받음
     - props로 받은 `Component` : 요청한 페이지. `GET /` 요청을 보냈다면 `/pages/index.js`파일이 props로 내려옴
     - pageProps : 페이지 getInitialProps를 통해 내려 받은 props
   - console은 client, server 모두 보임

   ```tsx
   // pages/_app.tsx
   import "../styles/globals.css";
   import type { AppProps } from "next/app";
   function MyApp({ Component, pageProps }: AppProps) {
     return <Component {...pageProps} />;
   }
   export default MyApp;
   ```

## Next.js 13업데이트 내용

- 위의 기능들은 13버전 이전의 내용들이다.
- Next.js 13.4버전이 지난 5월 4일, stable해짐에 따라 Next.js 13 업데이트 사항에 대해 알아 둘 필요가 있다. 13버전에서는 상당히 많은 변화가 일어났다.

### 1. App Router (Stable)

1. 기존 pages 폴더 라우팅 -> app 폴더 라우팅
2. `_app` file -> `layout` file
3. `_document` file -> React로 구현 가능
4. 어느 파일에서든지 css 파일 import 가능
5. getStaticProps, getServerSideProps -> 순수 JS로 async와 await를 이용하여 구현 가능
6. Server Component와 Client Component
   - Server Component : 브라우저에서 JS 번들링되지 않음
   - Client Component : 자동으로 JS 번들링됨
     -> 점진적으로 server to client로 보낼 수 있음

### 2. Turbopack(Beta)

- 테스트 중인 새로운 번들러
- 기존 Webpack보다 빠르고, 더 작은 번들을 생성

### 3. Server Actions(Alpha)

- 중간 API layer없이 Server의 data 변경 가능

### Reference

- [Next.js의 렌더링 과정](https://www.howdy-mj.me/next/hydrate)

- [Next.js 기본 개념](https://kyounghwan01.github.io/blog/React/next/basic/#next-js%E1%84%80%E1%85%A1-%E1%84%8C%E1%85%A6%E1%84%80%E1%85%A9%E1%86%BC%E1%84%92%E1%85%A1%E1%84%82%E1%85%B3%E1%86%AB-%E1%84%8C%E1%85%AE%E1%84%8B%E1%85%AD-%E1%84%80%E1%85%B5%E1%84%82%E1%85%B3%E1%86%BC)
- [Hydrate란?](https://narup.tistory.com/230)
- [Next.js 13](https://nextjs.org/blog/next-13-4)

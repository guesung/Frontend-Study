# SSR(Server Side Rendering)

서버쪽에서 렌더링 준비를 모두 끝마친 상태로 클라이언트에 전달하는 방식입니다.

### SSR 단계

![](https://velog.velcdn.com/images/haizel/post/ec2bcf2b-c9e8-459b-8462-e4eefd7bcd6a/image.png)

1. 사용자가 웹 사이트에 요청을 보냅니다.
2. Server는 즉시 렌더링 가능한 HTML 파일을 만듭니다.
3. 클라이언트에 전달된 HTML은 이미 렌더링 준비가 되었기 때문에 즉시 렌더링됩니다. 단 아직 사이트에서 조작은 불가능합니다(JavaScript가 읽히기 전)
   <img src='https://velog.velcdn.com/images%2Flongroadhome%2Fpost%2F7a59898d-7b4a-49e3-ba2d-3f6eff32cb6d%2Fwithoutjs.PNG' width=300 />

   - 첫 페이지 요청으로 받아온 HTML문서를 확인해보면 \<div id='\_\_next'>\</div>안에 내용이 들어있는 것을 확인할 수 있습니다.

4. 브라우저가 JavaScript를 다운 받습니다.
5. 이때, 다운이 진행되고 있는 상태에서 사용자는 컨텐츠를 볼 순 있지만 사이트를 조작할 수는 없습니다. 대신 브라우저는 사용자의 조작을 기억해둡니다.
6. 다운로드가 완료되면 브라우저가 JavaScript Framework를 실행합니다.
7. JavaScript가 성공적으로 컴파일되면 이전에 기억해둔 사용자의 조작이 실행됩니다.

모든 과정이 완료되면 웹 페이지의 상호작용이 가능해집니다.

<br />

# CSR (Client Side Rendering)

말 그대로 렌더링이 클라이언트 쪽에서 일어나는 방식입니다. 즉, 요청을 받으면 서버는 클라이언트에 HTML과 JavaScript를 보내주고, 클라이언트는 그것을 받아 렌더링을 시작합니다.

### CSR 단계

![](https://velog.velcdn.com/images/haizel/post/ad9e98a3-f633-4f3f-b080-85bd1f580768/image.png)

1. 사용자가 웹 사이트에 요청을 보냅니다.
2. CDN이 HTML 파일과 JS로 접근할 수 있는 링크를 클라이언트에게 보냅니다.

   > **CDN**(Content Delivery Network) : 엔드 유저의 요청에 `물리적`으로 가까운 서버에서 요청에 응답하는 방식

   <img src='https://velog.velcdn.com/images%2Flongroadhome%2Fpost%2Fb75d1542-2a15-4de0-a356-95ff56326233%2Fcra22.PNG' width=300 />

   - 첫 페이지 요청으로 받아온 HTML문서를 확인해보면 \<div id='app'>\</div>으로 비어있는 것을 확인할 수 있습니다.
   - 그 밑에 번들링된 static/js 경로의 'bundle.js' 파일을 전달하고 있는 것을 확인할 수 있습니다.

3. 클라이언트는 전달 받은 링크를 통해 HTML과 JS를 다운 받습니다.
4. 브라우저가 JS를 다운 받습니다. (이때 SSR과 달리 사용자는 컨텐츠를 볼 수 없습니다)
5. 다운로드가 완료된 JS가 실행 되며 데이터 요청을 위한 API를 호출합니다.
6. 그럼 서버는 API 요청을 받고 응답합니다.
7. API를 통해 서버로부터 전달받은 데이터를 placeholder 자리에 넣어줍니다.

모든 과정이 완료되면 웹 페이지의 상호작용이 가능해집니다.

<br />

# SSR과 CSR의 장,단점

## SSR 장점

1. **첫페이지 로딩이 빠르다.**
   - CSR의 경우 모든 HTML, JavaScript를 한번에 불러오지만, SSR은 필요한 부분의 HTML과 JavaScript만 불러와 상대적으로 첫 페이지 로딩 시간이 짧습니다.
2. **SEO(serach engine optimization : 검색 엔진 최적화) 향상**

- 서버에서 렌더링 후 개별 페이지를 넘겨받기 때문에 각 페이지에 대한 정보를 입력하기 쉽습니다. 때문에 CSR보다 SEO를 향상시킬 수 있습니다.

## SSR 단점

1. **화면 깜빡임 현상**
   - 링크 이동 시 부분 업데이트를 하는 CSR과 달리 SSR은 새로운 HTML 파일 자체를 서버에서 받아오기 때문에 화면 깜빡임 현상이 있습니다.
2. **페이지 간 이동 속도가 느리다.**
   - CSR은 이미 첫 페이지 로딩 때 모든 부분을 구성하는 코드를 받아온 것에 반해, SSR는 필요한 부분만 받아왔기 때문에 이동한 페이지에 대한 새로운 구성 코드를 받아와야 한다.
3. **기능 동작 문제**

- SSR은 JavaScript 파일보다 완성된 HTML을 먼저 받아오기 때문에, 화면이 구현되어도 JavaScript 다운이 늦어진다면 기능이 동작하지 않을 수 있습니다.

<br />

## CSR 장점

1. **원하는 내용만 업데이트**
   - CSR은 빈 HTML에 JavaScript를 이용해 동적으로 DOM을 생성하는 방식으로, 원하는 내용만 업데이틀 할 수 있습니다.
   - 예를 들어 링크를 이동해도 중복해 사용하는 헤더, 푸터와 같은 요소는 업데이트 하지 않고, 변하는 콘텐츠 내용만 업데이트해 로드할 수 있습니다.
2. **페이지간 이동 속도가 빠르다.**

## CSR 단점

1. **SEO(serach engine optimization : 검색 엔진 최적화) 취약**
   - HTML 파일을 하나만 받아와 작동하기 때문에 페이지 각각에 대한 정보를 담기 어려워 SEO에 취약합니다.
2. **첫 페이지 로딩이 느리다.**

<br />

# 언제 SSR, 또는 CSR를 사용하는게 좋을까?

## SSR

- 네트워크가 느릴 때 (SSR은 각 페이지마다 필요한 내용을 나눠 불러온다)
- SEO(serach engine optimization : 검색 엔진 최적화)가 필요할 때
- 최초 로딩이 빨라야 하는 사이트를 개발할 때
- 웹과 사용자 간의 상호작용이 많지 않을 때
- 매인 스크립트가 크고 로딩이 느릴때
  > CSR은 메인스크립트가 로딩이 끝나면 API로 데이터 요청을 보낸다. 하지만 SSR은 한번의 요청에 아예 렌더가 가능한 페이지가 돌아온다.

## CSR

- 네트워크가 빠르거나 서버의 성능이 좋지 않을 때
- SEO 가 중요하지 않을 때
- 메인 스크립트가 가벼울 때
- 웹과 사용자 간의 상호작용이 많을 때 (모든 작업이 완료되어야 렌더링 되기 때문에, 렌더링 이전 불필요한 사용자의 행동을 막을 수 있다.)

<br />
<br />

# SPA

# 궁금증

### 1. CSR인 React에서도 페이지 이동할 때 `router.push('/~')`를 사용하는데, 이때도 SSR과 같이 새로운 HTML 파일을 받아오는 것인가?

NO. CSR은 빈 HTML`(\<div id='app'></div>)`에 JavaScript를 이용해 `동적으로 DOM을 생성`하는 방식으로, 원하는 내용만 업데이트를 하는 것으로, 새로운 파일을 받아오는 것이 아니다.

### 2. SSR과 SSG의 차이점이 무엇인가요?

A : 동적으로 페이지를 생성하느냐, 정적으로 생성하느냐가 SSR과 SSG의 차이

- SSG

  <img src='https://velog.velcdn.com/images%2Flongroadhome%2Fpost%2F9137471c-0491-41c2-bd59-f9d1cd0a2811%2Fadfasdf.png' width=400/>

  1. 빌드를 진행할 때 pages폴더에서 각 페이지에 대해 각각의 문서를 생성해서 static한 파일로 생성 -> CDN에 캐시
  2. 해당 페이지에 대한 요청이 발생하게 되면, 이 페이지들을 재생성하는 것이 아니라 이미 생성된 페이지를 반환

     - CSR보다 응답속도가 빠르고, Next.js에서도 SSG형태로 사용하는 것을 지향
     - `마케팅 페이지`, `블로그 게시글`, `제품의 목록`과 같이 정적 생성된 정보를 각 요청에 동일한 정보를 반환하는 경우 사용
     - Next.js에서 사용하는 방법 : `getStaticProps`(API와 같은 외부 데이터 받아올 때), `getStaticPaths`(동적 라우팅으로 페이지 생성할 때)

- SSR

  <img src='https://velog.velcdn.com/images%2Flongroadhome%2Fpost%2F2b082fb2-ca4f-487d-a3d7-d6211e2c14f3%2Ffsfsdbsdfse.png' width=400 />

  - 요청이 들어올 때마다 페이지를 생성해서 반환 -> 응답속도가 느림
  - `항상 최신 상태를 유지해야하는 웹 페이지`나, `분석 차트`, `게시판` 등, 사용자의 요청마다 동적으로 페이지를 생성해 다른 내용을 보여주어야 하는 경우에 사용
  - Next.js에서 사용하는 방법 : `getServerSideProps`(서버에서 데이터를 받아와 렌더링할 때)
    - 빌드시에 요청하는 것이 아니라, 매 요청마다 데이터를 요청하기 때문에 자주 업데이트 되어야 하는 페이지에서만 사용

### 4. Next.js에서 사용하는 것은 그럼 SSG인가요, SSR인가요?

- Next.js에서 기본 default값으로 적용되는 것은 SSG
- Next.js에서 SSR을 사용하려면 `getServerSideProps`를 사용해야 한다.

### 5. Next.js에서는 그럼 CSR을 사용하지 않나요?

A : NO

- Next.js는 SSR의 장점과 CSR의 장점을 적절히 섞은 좋은 성능의 앱을 만들기 위해 사용
- Next.js의 CSR 예시 : \<Link> 태그를 이용한 페이지 이동, `useEffect`, `useState`
- 즉, Next.js는 최초 페이지만 SSR, 그 후 Link를 토한 이동은 CSR이다.

https://theodorusclarence.com/blog/nextjs-fetch-method

이어서 작성

### 6. Next.js에서 CSR, SSR, SSG 모두 사용할 수 있는건가요?

A : YES

- CSR 코드 예시 : useEffect

  ```js
  // page/about.js
  import React, { useEffect, useState } from "react";
  import axios from "axios";

  const About = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
      const getList = async () => {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/posts`
        );
        const data = res.data;
        setList(data);
      };
      getList();
    }, []);

    return (
      <div className="About">
        <h1>여기는 About 페이지요!</h1>
        {list.length &&
          list.slice(0, 10).map((item) => <li key={item.id}>{item.title}</li>)}
      </div>
    );
  };

  export default About;
  ```

  - CSR방식으로 `useEffect를` 사용하여 컴포넌트가 마운트 되었을 때 데이터를 가져오고, 가져온 데이터를 화면에 뿌려줌
  - 해당 페이지에 진입하는 순간, useState에서 선언한 list변수에 아무런 데이터가 담겨있지 않음
  - 때문에 해당 list의 길이가 0이라는 정보가 잠깐 렌더링 되었다가, useEffect를 통해 데이터를 받아오게 되면 화면에 list를 띄움

    <img src='https://velog.velcdn.com/images%2Flongroadhome%2Fpost%2Fc73c4b35-d9ed-4341-a5cd-e65e125311b3%2Fbbbbbb.PNG' width=400/>

- SSG 코드 예시 : getStaticProps

  ```js
  const About = ({ list }) => {
    return (
      <div className="About">
        <h1>여기는 About 페이지요!</h1>
        {list.length &&
          list.slice(0, 10).map((item) => <li key={item.id}>{item.title}</li>)}
      </div>
    );
  };

  export default About;

  export const getStaticProps = async () => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
    const data = res.data;

    console.log(data[1]); // 해당 콘솔은 어디에서 출력이 되나요?

    return {
      props: {
        list: data,
      },
    };
  };
  ```

  - SSG방식으로, 요청에 따라 그때마다 HTML 문서를 생성할 필요 없이 첫 요청에 하나의 정적 HTML 문서를 생성 후 그 이후의 요청엔 계속 동일한 문서 반환
  - 뿌려준 데이터 역시 미리 서버에서 처리하여 완성된 정적 HTML문서를 반환한다면 SEO 적용에 용이
  - `console.log(data[1])`은 chrome console창이 아니라, IDE 서버 console창에서 출력 됨 (`getStaticProps`는 빌드 시에 실행되기 때문에)

    <img src='https://velog.velcdn.com/images%2Flongroadhome%2Fpost%2F1aa96f5b-a02e-45fd-9d8c-5df61edd8047%2Fadfsdfsdfsdfds.PNG' width=400/>

- SSR 코드 예시 : getServerSideProps (Dynamic Routing)

  ```js
  // page/[id].js
  import React from "react";
  import axios from "axios";

  const Detail = ({ item }) => {
    return (
      <div className="Detail">
        <h1>{item.title}</h1>
        <p>{item.body}</p>
        <p>{item.id}번째 게시글</p>
      </div>
    );
  };

  export default Detail;

  export const getServerSideProps = async (ctx) => {
    const id = ctx.params.id;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    const data = res.data;

    console.log(data); // 해당 콘솔은 어디에서 출력이 되나요?

    return {
      props: {
        item: data,
      },
    };
  };
  ```

  - SSR방식으로 `getServerSideProps를` 사용하여 서버 사이드에서 1차적으로 HTML을 파싱할 때 데이터를 가져와서 조립해서 전달
  - ctx라는 인자를 받는데, 이는 context의 약자로, Next.js에서 제공하는 Router객체와 비슷한 역할을 한다.

- SSG 코드 예시 2 : getStaticPaths (Dynamic Routing)

  ```js
  // page/[id].js
  import React from "react";
  import axios from "axios";

  const DetailStatic = ({ item }) => {
    return (
      <div>
        {item && (
          <div className="Detail">
            <h1 style={{ color: "#fff" }}>with Static Generation</h1>
            <h1>{item.title}</h1>
            <p>{item.body}</p>
            <p>{item.id}번째 게시글</p>
          </div>
        )}
      </div>
    );
  };

  export default DetailStatic;

  export const getStaticPaths = async () => {
    return {
      paths: [
        { params: { id: "1" } },
        { params: { id: "2" } },
        { params: { id: "3" } },
      ],
      fallback: true,
    };
  };

  export const getStaticProps = async (ctx) => {
    const id = ctx.params.id;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    const data = res.data;

    return {
      props: {
        item: data,
      },
    };
  };
  ```

  - SSG를 적용하여 각 제품군의 상세 페이지를 미리 정적으로 생성하고 싶을 떄 사용

  1. getStaticProps로 getServerSideProps와 동일한 방식으로 데이터를 가져온다. 하지만, static이기 때문에 매 요청마다 렌더링되지 않고 가져온 데이터로 서버에 정적 HTML문서를 생성할 것이다.
  2. getStaticPaths는 Dynamic 경로를 지정해주었다.

- 배포 모드 폴더 구조 살펴보기

  - 개발 모드에서는 빌드가 되지 않는다. (빌드는 배포모드에서만 이뤄짐)
  - 배포 모드 폴더 구조
    <img src='https://velog.velcdn.com/images%2Flongroadhome%2Fpost%2F50a265d7-33ba-472f-b5ef-519ab6e64c42%2F111.PNG' width=400 />

        - .next 폴더 : 빌드 결과물이 저장되는 폴더
        - pages 폴더 : Next.js에서 페이지를 구성하는 파일들이 저장되는 폴더
        - public 폴더 : 정적 파일들이 저장되는 폴더
        - detail(SSR, ServerSideProps) 폴더 : js 파일만 존재
            - 해당 페이지에 접속하면 그때서야 js를 통해 HTML 파일을 받아와 HTML 파일이 생성된다.
        - detail-static(SSG, getStaticProps, getStaticProps) 폴더 : html과 js파일이 존재하며, 각 페이지 별로 html과 json이 생성되어 있다.
            - 빌드 시에 모든 HTML 파일이 생성된다.

### 7. 그렇다면, Server는 어디있나요?

- Next는 자체적으로 서버를 가지고 있다. 내부적으로는 Node.js환경에서 구동되는 서버일 확률이 높다. (명확한 문서 X)
- Next에서 pages폴더의 영역은 FE와 BE, 즉 서버와 공유하고 있는 공간이라 생각하면 된다.
- 해당 폴더의 파일에서 export하는 getServerSideProps와 getStaticProps 등의 함수는 Next의 ㄴ서버로 전달되어 주어진 임무를 수행하고 이를 다시 컴포넌트 단에 결과를 반환해주는 것이다.
- 순수 React에서는 해당 영역이 온전히 컴포넌트, 즉 프론트의 영역이기 때문에 저렇게 함수를 선언해봐야 서버에 전달되지 않는다.

### 8. 그럼, 정리하자면 언제 무얼 쓰면 돼요?

1. CSR 방식 : 굳이 SEO 적용 또는 데이터 pre-rendering이 필요 없다면
2. SSG 방식 : 정적 문서로 충분한 화면이면서 빠른 HTML 문서 반환이 필요하다면
3. SSR 방식 : 매 요청마다 달라지는 화면이면서 서버 사이드로 이를 렌더링 하고자 한다면

### 7. Next.js에서 페이지 이동은 어떻게 이뤄지나요?

A : \<Link href='~'>\</Link>를 통해 이뤄진다.

- 기존 HTML의 \<a> 태그로 이동하면, 이전에 접속했던 페이지라도 서버에 다시 요청해 데이터를 받아와야 하지만, Next를 사용하면 이전에 받아온 데이터는 다시 요청하지 않는다.
- Next.js는 코드 분할을 자동으로 수행하므로, 각 페이지는 해당 페이지에 필요한 것만 로드한다.
- 홈페이지가 렌더링될 때, 다른 페이지의 코드는 처음에 공개되지 않는다. <-> React는 처음부터 제공
  - 수백 페이지가 있는 경우에도 홈페이지가 빠르게 로드될 수 있음
  - React에서는 다른 페이지에서 오류가 발생하면 전체 페이지에 `error`메시지가 뜨지만, Next에서는 해당 페이지만 `error`메시지가 뜨고, 다른 페이지는 정상적으로 작동하는 현상
- Next.js의 프로덕션 빌드에서 Link가 브라우저의 화면(뷰포트)에 나타날 때마다, 사용자가 링크를 클릭하기 전에 Next.js가 백그라운드에서 연결된 페이지 코드를 미리 로드하여 페이지 전환이 거의 즉각저긍로 이뤄짐
- `router.push()`는 \<a>태그를 만들지 않기 때문에 크롤링이되지 않아 SEO에 불리

### 8. 첫 페이지 이후로 CSR방식으로 페이지 이동이 이뤄진다고 하셨는데, 그럼 SSG방식으로 구현한 페이지는 이미 서버에서 만들어 진 것인데 어떻게 되나요?

- 해결 X

# **📎 참고문서**

- [[ 기술 스터디 ] SSR과 CSR의 차이](https://velog.io/@vagabondms/%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%84%B0%EB%94%94-SSR%EA%B3%BC-CSR%EC%9D%98-%EC%B0%A8%EC%9D%B4)
- [CSR과 SSR의 차이점](https://story.pxd.co.kr/1662)
- [웹 렌더링 방식](https://velog.io/@eeeve/%EC%9B%B9-%EB%A0%8C%EB%8D%94%EB%A7%81-%EB%B0%A9%EC%8B%9D-CSR-SSR-SSG)
- [SSG, SSR 개념 정리](https://narup.tistory.com/235)
- [Next.js와 함께 살펴보는 CSR, SSG, SSR, ISG](https://velog.io/@te-ing/NextJS%EB%A1%9C-%EC%82%B4%ED%8E%B4%EB%B3%B4%EB%8A%94-SSG-ISG-SSR-CSR)
- [](https://velog.io/@longroadhome/FE-SSRServer-Side-Rendering-%EA%B7%B8%EB%A6%AC%EA%B3%A0-SSGStatic-Site-Generation-feat.-NEXT%EB%A5%BC-%EC%A4%91%EC%8B%AC%EC%9C%BC%EB%A1%9C)

# 1. 동일 출처 정책(Same Origin Policy, SOP)

SOP은 대부분의 웹 브라우저에서 채택하고 있는 보안 정책으로, 보안을 위해 프로토콜, 호스트, 포트가 동일한 서버로만 데이터 요청을 주고 받을 수 있는 정책을 말합니다.

SOP은 엄격한 보안 정책으로 외부 데이터를 불러오진 못하지만, CSRF나 XSS 와 같은 보안 취약점 공격으로부터 안전하다는 장점이 있습니다.

>
💥 **웹 브라우저에서 보안정책으로 SOP을 채택하는 이유**
- 브라우저는 기본적으로 사용자가 방문하는 사이트를 신뢰하지 않기 때문에, 다른 서버에서 받아온 데이터는 차단합니다.
- 브라우저는 토큰이나 쿠키 등과 같이 사용자의 정보 데이터를 받아와 저장하는데, 만약 제 3자가 이를 탈취해 정보를 변조하여 서버에 보내면 심각한 보안 문제가 발생할 수 있기 때문입니다.

>
💥 **동일 프로토콜, 호스트, 포트란 ?**
SOP은 동일 출처(동일 프로토콜, 호스트, 포트)로만 응답을 허용합니다.
<img src='https://velog.velcdn.com/images/haizel/post/e21f46da-b3e6-4aee-a526-fe0a39dfaa47/image.png' width='1000'/>


<br />

# 2. 교차 출처 리소스 공유(Cross Origin Resource Sharing, CORS)

외부 데이터를 사용할 수 없는 SOP의 문제를 해결하기 위한 정책으로, **추가 HTTP 헤더**를 사용해 서로 다른 출처간에도 데이터 요청과 응답을 할 수 있도록 허용하는 정책을 말합니다.

<br />

# 3. CORS 요청 방식

## 1. 단순 요청(Simple Request)

### 📍 단순요청 조건

다음 조건을 만족하는 경우 브라우저는 해당 CORS요청을 단순 요청으로 처리합니다.

1. HTTP Method가 `GET`, `POST`, `HEAD` 중 하나일 경우
2. Content-Type 헤더가 다음 중 하나인 경우
    - application/x-www-form-urlencoded
    - multipart/form-data
    - text/plain
3. CORS-safelisted request-header를 포함하는 경우(Fetch spec)
4.  XMLHttpRequest.upload 에 이벤트 핸들러, 리스너가 등록되지 않은 경우
5.  ReadableStream 객체가 포함되지 않은 경우

### 📍 단순요청 동작 방법

![](https://velog.velcdn.com/images/haizel/post/28513593-3e75-44f1-ab0f-f87035fcbc9c/image.png)

1. 사용자가 요청해서 자신의 Origin을 실어 서버로 요청을 보낸다.
2. 서버는 요청 헤더의 Origin을 확인한다.
3. CORS 요청이 유효하면 → 서버는 응답헤더에 **`Accecss-Control-Allow-Origin`** 헤더를 추가해 사용자에게 응답한다.

<br />


## 2. 프리플라이트 요청(Preflight Request)

단순 요청의 조건을 만족하지 못할시 브라우저가 자동으로 프리플라이트 요청을 생성해 요청을 보냅니다.

프리플라이트 요청은 실제 요청을 보내기 전, `OPTIONS 메서드`로 서버측에 사전 요청을 보내 해당 출처에 대한 접근 권한이 있는지 확인하는 것을 말합니다.


### 📍  프리플라이트 요청 동작 방법
![](https://velog.velcdn.com/images/haizel/post/359927f5-fcd2-4c04-897f-693e25197915/image.png)

1. 실제 요청을 보내기 전 `프리플라이트 요청`을 보내고
2. 응답헤더에 `ccess-Control-Allow-Origin` 가 담겨 돌아오면 실제 요청을 보냅니다.
3. 만약 요청한 출처에 접근 권한이 없다면, 브라우저는 CORS를 띄우고, 실제 요청은 절달되지 않습니다.

### 📍 프리플라이트 요청의 장점

1. 실제 요청을 보내기전 미리 권한 확인을 할 수 있기 때문에, 실제 요청을 처음부터 보내는 것보다 **리소스 측면에서 효율적**입니다.
2. CORS에 대비하지 않은 **서버를 보호**할 수 있습니다.
    - CORS 이전에 만들어진 서버들은 SOP 요청만 가능한 상황만을 고려했기 때문에, 다른 출처에 대한 요청에 대한 대비가 되어 있지 않을 수 있습니다.
    
<br />

## 3. 인증 정보를 표함한 요청(Credentialed Request)

요청 헤더에 인증 정보를 담아 보내는 요청을 말합니다.

같은 Origin에서 HTTP 통신을 하는 경우 → 요청헤더에 쿠키가 자동으로 들어가게 되지만, Origin이 다른 서버와 HTTP 통신을 할 때 요청헤더에 쿠키와 같은 인증정보를 요청헤더에 담아 보내려면 별도 설정이 필요합니다.

### 📍 클라이언트 Side

**요청헤더**에 Axios 요청일 경우 `withCredentials : true` 를, Fetch 요청일 경우 `credentials : ‘include’` 를 넣어주어야 합니다.

> **credentials 옵션**
> 
> - same-origin: 같은 Origin간에 요청에만 인증 정보를 담을 수 있다. (기본값)
> - include: 모든 요청에 인증 정보를 담을 수 있다.
> - omit: 모든 요청에 인증 정보를 담지 않는다

### 📍 서버 Side

1. **응답헤더**에  `Access-Control-Allow-Credentials : true` 를 넣어줘야 합니다.
2. `Access-Control-Allow-Origin` 헤더를 `*(와일드카드)`가 아닌,  `명시적인 URL` 로 지정해야 합니다.
    - `*(와일드카드)` 는 모든 출처를 허용한다는 뜻으로, 인증정보를 담은 요청의 경우, 출처를 정확하게 설정해야 한다.
    
<br />

## 4. CORS 설정 방법


### 📍 서버 Side

1. **Access-Control-Allow-Origin response header**
- 응답헤더에 접근권한을 부여하는 헤더를 추가해 CORS 에러를 해결할 수 있다.

```jsx
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
    res.header("Access-Control-Allow-Origin", "https://example.com"); // 특정 도메인
});
```

- 이 외에도 다음 헤더를 추가해 CORS 에러를 해결할 수 있다.

```jsx
Access-Control-Allow-Method
Access-Control-Max-Age
Access-Control-Allow-Headers
```

- 하지만 이 방법의 경우, 접근 권한을 허용하는 모든 요청의 응답헤더에 추가해야 하기때문에 번거롭다는 단점이 있다.

2. **Node.js 서버**
- 응답헤더 설정 통해 CORS 설정을 할 수 있다.

```jsx
const http = require('http');

const server = http.createServer((request, response) => {
// 모든 도메인
  response.setHeader("Access-Control-Allow-Origin", "*");

// 특정 도메인
  response.setHeader("Access-Control-Allow-Origin", "https://codestates.com");

// 인증 정보를 포함한 요청을 받을 경우
  response.setHeader("Access-Control-Allow-Credentials", "true");
```

3. **Express 서버**
- CORS 미들웨어를 사용해 더 간단하게 CORS 설정을 할 수 있다.

```jsx
const cors = require("cors");
const app = express();

//모든 도메인
app.use(cors());

//특정 도메인
const options = {
  origin: "https://codestates.com", // 접근 권한을 부여하는 도메인
  credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
  optionsSuccessStatus: 200, // 응답 상태 200으로 설정
};

app.use(cors(options));

//특정 요청
app.get("/example/:id", cors(), function (req, res, next) {
  res.json({ msg: "example" });
});
```

### 📍 클라이언트 Side

**1. 프록시 설정**

>
💥 **프록시(Proxy)란?**
보안 등 다양한 이유로 직접 통신하지 못하는 두 개의 컴퓨터 사이에서 서로 통신할 수 있도록 돕는 역할을 말한다.

![](https://velog.velcdn.com/images/haizel/post/50014479-ba0f-4497-a6ce-66194557af2a/image.png)


</aside>

**2. 실제 프록시 사용 코드**

**프록시 설정**

```jsx
/*<-- setProxy.js -->*/

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target:
        "http://ec2-3-39-11-242.ap-northeast-2.compute.amazonaws.com:8080",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
```

**프록시 사용**

```jsx
/*<-- api 요청 파일 -->*/
...

await axios
      .post(
        `/api/sendy/auth/login`,
       ...
```

<br />

**📎 참고문서**

- [[WEB] 동일 출처 정책(SOP)과 교차 출처 리소스 공유(CORS)란?](https://yoo11052.tistory.com/139)
- [Same-Origin Policy 동일 출처 정책과 CORS 에러](https://velog.io/@yejinh/CORS-4tk536f0db)
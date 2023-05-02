# JWT(JSON Web Token) 

## 1. JWT 란 ?
JWT는 `JSON Web Token`의 약자로, 서버와 클라이언트 간 사용자를 인증하고 식별하기 위한 `토큰` 기반 인증 방식을 말한다.
JSON 형식(Key/Value)의 표준 규격에 따라 생성 ・ 암호화되어 복잡하고 읽기 어려운 String 형태로 저장된다.


## 2. JWT 구성요소
구분자 `.`로 구분되며, 헤더(header), 페이로드(payload), 서명(signature) 세파트로 구성되어 있다.
<img src='https://velog.velcdn.com/images/haizel/post/f583e6f7-7158-491e-b063-4a0ce0c3cb21/image.png' width='500'/>

- **헤더 (Header)**
어떤 알고리즘으로 암호화(alg) 할지, 어떤 토큰 타입을(typ) 사용할 지에 대한 정보가 들어있다.
```jsx
{
	"typ" : "JWT",
	"alg" : "HS256"
}

```
- **정보 (Payload)**
전달할 정보를 담고 있다.
각 정보들은 `클레임(Claim)`이라고 부르며,  name / value의 한 쌍으로 이뤄져있다.
Payload의 정보는 수정이 가능하기 때문에 인증에 필요한 `✱ 최소한의 정보만` 담아야한다.
✱ 개인 정보(아이디/비밀번호)가 포함되선 안되며, 해당 토큰의 권한 범위나 발급일/만료일 등

- **서명 (Signature)**
JWT의 핵심 파트로, 토큰 정보가 서버로부터 생성된 것인지 증명하기 위해 사용한다.
헤더와 페이로드 값을 인코딩 한 후, `비밀 키(secret Key)`를 이용해 헤더에서 정의한 알고리즘으로 해싱한다. 그리고 해상 값을 다시 인코딩하여 생성한다.
서명을 하면 서버의 비밀키를 알지 않는 한, 외부에서 토큰을 변조할 수 없다.

> 
- **헤더 (Header)** : 토큰 유형과 해시 알고리즘 종류
- **정보 (Payload)** : 사용자의 인증/인가 정보
- **서명 (Signature)** : 헤더와 페이로드를 비밀키로 암호화


## 3. JWT의 동작원리(Access token & Refresh token)
JWT(Access token)만을 사용한 인증 방식은 몇가지 문제점이 존재한다. 1) 토큰의 유효기간이 짧다면 사용자가 자주 로그인을 해야 하기때문에 번거롭고, 토큰을 통해 사용자 권한을 인증하므로 2) 토큰의 유효기간이 길다면, 제 3자에게 토큰을 탈취당할 경우 보안에 취약하다.
이런 문제점을 보완하기 위해 `Access token & Refresh token` 를 통한 인증 과정을 사용한다.

Access token과 Refresh token은 모두 JWT로 Access token은 접근에 관여하는 토큰, Refresh token은 재발급에 관여하는 토큰의 역할을 한다.
<img src='https://velog.velcdn.com/images/haizel/post/b02fe0b8-d562-4d6a-a7c3-4a5e3c98d6e1/image.png' width='500'/>

1. 사용자가 ID/PW를 통해 로그인하면
2. 서버는 회원 DB를 통해 사용자인지 확인한다.
3. 로그인이 완료 되면, Access Token과 Reresh Token을 발급한다. 이때 회원 DB에 Refresh Token을 저장해둔다.
4. Access Token과 Reresh Token을 서버로부터 전달 받는다.
5. 클라이언트가 Access Token을 헤더에 담아 데이터 요청을 보내면,
6. 서버는 Access Token 검증하여
7. 클라이언트에게 요청 데이터를 돌려준다.
`Access Token 이 만료 된 후`
8. 클라이언트가 만료된 Access Token을 헤더에 담아 요청을 보내면,
9. 서버는 Access Token이 만료됨을 확인하고
10. 클라이언트에게 해당 내용을 안내한다.
11. 클라이언트는 만료된 Access Token과 Reresh Token를 함께 서버로 갱신 요청을 보내면,
12. 서버는 회원 DB의 Refresh Token을 확인하여, 새로운 Access Token을 갱신해 발급한다.
13. 클라이언트는 갱신된 Access Token를 전달 받는다.
 
## 4. JWT의 장점
**1. 확장성**
JWT는 토큰 자체에 사용자 정보가 저장 되어 있어 서버는 토큰 검증만을 통해 사용자 임을 확인할 수 있다.
또한 사용자가 늘어나도 사용자 인증에 대한 서버의 부담을 줄일 수 있다.

**2. 쉬운 데이터 요청**
단순히 HTTP 헤더에 Access Token을 담아 보내면, 손쉽게 요청하고 응답을 받을 수 있다.


## 5. JWT의 한계점
**1. Stateless**
JWT는 상태를 저장하지 않기 때문에 한번 생성되면 삭제가 불가능하다. 따라서 토큰이 만료되기 전 제 3자에게 탈취될 경우, 심각한 보안상 문제가 발생할 수 있어 반드시 만료 시간을 넣어주어야 한다.

**2. JWT토큰 길이**
Claim이 많아질주록 JWT토큰이 길어진다. 
때문에 데이터 요청 시 요청헤더에 담아 보내는 Access Token의 길이가 길어질수록 요청 및 응답이 늦어지는 등 네트워크에 부담이 된다.

**3. Payload 인코딩**
Payload 정보는 암호화되지 않고 인코딩만 하기 때문에, Payload가 탈취되어 디코딩하면 모든 정보에 접근가능하다.
따라서 Payload에는 ID, PW와 같은 중요 데이터를 담지 않아야한다.
 
<br />

### 출처
- [JWT](https://www.daleseo.com/jwt/)
- [JWT 쉽게 정리한 CORE 개념들](https://etloveguitar.tistory.com/101)
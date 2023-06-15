# Token 저장 위치

## Intro

- 해커가 이미지 태그 혹은 브라우저 URL에 JS를 삽입할 수 있는 취약점이 있다면 localstorage나 쿠키에 저장되 토큰은 바로 허술하게 털림

### XSS vs CSRF

- XSS(Cross Site Scripting) : 해커가 악의적인 스크립트를 삽입하여 공격하는 방식
- CSRF(Cross Site Request Forgery) : 해커가 사용자가 의도하지 않은 요청을 통해 공격하는 방식

1. XSS가 **`사용자가 특정 사이트를 신뢰`** 하기 때문에 발생하는 문제라면, CSRF는 **`특정 사이트가 사용자를 신뢰`** 하기 때문에 발생하는 문제이다.
2. XSS는 **`클라이언트의 브라우저`** 에서 발생하는 문제이고, CSRF는 **`서버`** 에서 발생하는 문제이다.
3. XSS는 사용자의 **`쿠키`** 를 탈취할 수 있고, CSRF는 서버로부터 **`권한`** 을 탈취할 수 있다.

## localstorage

1. XSS를 방어할 수 있는 방법이 없기에 localstorage보다 쿠키가 그나마 보안에 나음
   - 단, 이 쿠키가 Http Only & Secure옵션이 켜져있을 때 해당
   - 이 말은 쿠키를 JS로 읽어올 수 없다는 말이고, 네트워크 감청을 통한 쿠키값 읽기르 방어한다는 말. 즉, XSS 공격을 통한 토큰 탈취를 방지할 수 있음

## Cookie

1. CSRF 위험 : Cookie라는 것이 브라우저가 서버에 요청을 보낼 때 자동으로 포함해서 보내는 값이기 때문에, 만약 그 Cookie 안에 세션 ID나 Access Token이 들어있다면 해커가 내 인증정보를 활용해서 서버에 나인 것처럼 속여서 요청을 보낼 수 있음

## 결론

- Refresh Token : HTTP Only & Secure = true 쿠키에 저장
- Access Token : 프로그램상 로컬 변수에 담아 놓기

=>

1. 해커가 CSRF 공격을 하더라도 Cookie에는 Access Token이 없기 때문에 인증 불가 상태가 되어 공격 차단
2. 해커는 HTTP Only & Secure Cookie 특성상 Refresh Token 자체를 털 방법이 없음
3. Access Token은 로컬 변수에 저장되어 있기 때문에 XSS를 통해 Access Token 자체를 털 수 없음

# Refrence

- [XSS와 CSRF(XSRF)의 차이점](https://dar0m.tistory.com/246)

# URI

## URI(Uniform Resource Identifier)

: 인터넷에 있는 자원을 어디에 있는지 식별하는 방법

- 인터넷에서 요구되는 기본조건으로, 인터넷 프로토콜에 항상 붙어다님
- 하위 개념으로 URL과 URN 존재

## URL(Uniform Resource Locator)

: 파일 식별자로, 네트워크 상에서 자원이 `구체적으로 어디` 있는지 위치를 알려주기 위한 규약

- 웹 사이트 주소 뿐 아니라 컴퓨터 네트워크 상의 자원을 모두 나타내는 표기법

## URN(Uniform Resource Name)

: 리소스의 위치, 프로토콜, 호스트에 상관없이 각 자원에 이름을 부여한 것

- URL이 리소스가 있는 위치를 지정한다면, URN은 리소스에 이름을 부여하는 것

## URI, URL, URN

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FFNN4n%2Fbtr6BA9qcSH%2FP5uh5vSeQxh4WzQyJuH6z1%2Fimg.png' width=400 />

1. Scheme : 리소스에 접근하는 데 사용할 프로토콜. 웹에서는 주로 http, https 사용
2. Host : 접근할 대상(서버)의 호소트명
3. Path : 접근할 대상(서버)의 경로에 대한 상세 정보

- 모든 URL(프로토콜+이름)은 URI(이름)이지만, 모든 URI가 URL은 아니다.
- URI는 식별하고, URL은 위치를 가리킨다.
- URL e.g. `https://google.com`
- URI e.g. `google.com`
  - 자원이 실제로 어디에 있는지(즉, 프로토콜이 무엇인지)를 제곻아지 않기 때문에 URL이 아님
  - 특정 자원을 식별할 수 있으므로 URI는 맞음. URL이 되려면 프로토콜 등 위치 정보가 필요

## URL 구성

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FoG95F%2FbtrQ0wnUmt3%2FbVswXt7OfFiMjvY4E8dM31%2Fimg.png' />

- 프로토콜(scheme) : https
- Host : www.google.com
  - 도메인명 또는 IP주소 직접 사용
- Port : 443
  - 일반적으로 생략 가능
  - 생략 시 http는 80포트, https는 443포트 설정
- Path : /search
  - 계층적 구조로 구성됨 (members/id/change ..)
- Query Parameter : q=hello&hl=ko
  - ?로 시작 되며, &로 여러 개 추가 가능
  - key=value 형태
- Fragment : #~
  - html 내부 북마크 등에 사용
  - 서버에 전송되는 정보는 아님

## URL의 웹 브라우저 요청 흐름

1. DNS서버를 조회해서 IP와 포트 주소를 받는다.

  <img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbzzH0U%2FbtrQ65WlPEn%2F26pxz48sNJ1J3PYOsqWUr0%2Fimg.png' width=400 />

2. 정보를 토대로 HTTP 요청 메시지를 생성한다.

  <img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FBQBvb%2FbtrQ4aKDfTh%2FeGe3P4O7f2GKCk6fakS4b0%2Fimg.png' width=400>

3. 서버에 HTTP 메시지 전송

   1. 웹브라우저의 SOCKET 라이브러리를 이용해서 TCP/IP 커넥션 연결 요청
   2. 이전단계에서 찾은 IP와 PORT정보를 가지고 SYN, SYN+ACK, ACK 과정(3 way handshake)을 통해 서버와 연결을 한다.
   3. 연결이 성공되면 TCP/IP 4계층으로 데이터를 전달한다.
   4. HTTP 메시지를 포함한 TCP/IP 패킷 생성하여 서버로 전송하게 된다.

   <img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcG02L5%2FbtrQ0l7QQxV%2Fy9ec7FsyAFBraLds4FMPH1%2Fimg.png' width=400 />

4. 서버는 패킷을 받으면 패킷을 까고 HTTP 메시지를 가지고 해석

   <img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F00rmF%2FbtrQ2flmjLG%2Fmb4L9BPK6RJtS4XknzdXj0%2Fimg.png' width=400 />

5. 그 후 html 데이터를 포함한 응답 메시지를 만들어서 클라이언트에 반환

   <img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FOnZik%2FbtrQ6IfP2sY%2F37YBeEl3TvKmT3WDEshs01%2Fimg.png' width=400/>

6. 클라이언트는 응답 메시지를 받아 화면에 렌더링

   <img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FH83DU%2FbtrQ26IsIUa%2FXQSFjL0sK1zglwsVdhvKpK%2Fimg.png' width=400/>

# Reference

- [URI와 URL, 어떤 차이점이 있나요?](https://www.elancer.co.kr/blog/view?seq=74)
- [URI랑 URL 차이점이 뭔데?](https://www.charlezz.com/?p=44767)
- [URL / URI / URN 차이점](https://inpa.tistory.com/entry/WEB-%F0%9F%8C%90-URL-URI-%EC%B0%A8%EC%9D%B4)
- [URL 구성 이해하기](https://inpa.tistory.com/entry/WEB-%F0%9F%8C%90-URL-%EA%B5%AC%EC%84%B1-%EC%9A%94%EC%86%8C-%EC%9A%94%EC%B2%AD-%ED%9D%90%EB%A6%84-%EC%A0%95%EB%A6%AC)

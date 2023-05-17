### REST API

- REST는 HTTP 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍처이다.
- REST API는 REST 기반으로 서비스 API를 구현한 것을 의미한다.

### REST API의 구성

- 자원: URI(Uniform Resource Identifier)
- 자원에 대한 행위: HTTP 요청 메소드
- 자원에 대한 행위 표현: 페이로드

### REST API 설계 원칙

- URI는 리소스를 표현해야 한다. 리소스를 식별할 수 있는 이름은 동사보다는 명사를 사용한다.
- 리소스에 대한 행위는 HTTP 요청 메서드로 표현한다. 요청 메서드(GET, POST, PUT, PATCH, DELETE 등)를 사용하여 CRUD를 구현한다.

### REST API 설계 예시

**1. URI는 동사보다는 명사를, 대문자보다는 소문자를 사용하여야 한다.**

```jsx
// Bad 
http://naver.com/Running/

// Good 
http://naver.com/run/
```

**2. 마지막에 슬래시 (/)를 포함하지 않는다.**

```jsx
// Bad
http://naver.com/test/  

// Good 
http://naver.com/test
```

**3. 언더바 대신 하이폰을 사용한다.**

```jsx
// Bad 
http://naver.com/test_blog

// Good 
http://naver.com/test-blog
```

**4. 파일 확장자는 URI에 포함하지 않는다.**

```jsx
// Bad 
http://naver.com/photo.jpg
  
// Good 
http://naver.com/photo
```

**5. 행위를 포함하지 않는다.**

```jsx
// Bad
http://naver.com/delete-post/1  

// Good 
http://naver.com/post/1
```

### HTTP 메서드

- GET: 리소스 조회, 쿼리스트링 사용 가능
- POST: 요청 데이터 처리, 주로 등록에 사용, 메시지 바드를 통해 서버로 요청 데이터를 전달해 서버는 요청 데이터를 처리하여 업데이트
- PUT: 리소스를 대체, 해당 리소스가 없으면 생성
- PATCH: 리소스 부분 변경
- DELETE: 리소스 삭제

- HEAD, OPTIONS, CONNECT, TRACE

### 참고

- [https://programmer93.tistory.com/39](https://programmer93.tistory.com/39)
- [https://khj93.tistory.com/entry/네트워크-REST-API란-REST-RESTful이란](https://khj93.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-REST-API%EB%9E%80-REST-RESTful%EC%9D%B4%EB%9E%80)
- 자바스크립트 딥 다이브 44장 REST API
- [https://inpa.tistory.com/entry/WEB-🌐-HTTP-메서드-종류-통신-과정-💯-총정리](https://inpa.tistory.com/entry/WEB-%F0%9F%8C%90-HTTP-%EB%A9%94%EC%84%9C%EB%93%9C-%EC%A2%85%EB%A5%98-%ED%86%B5%EC%8B%A0-%EA%B3%BC%EC%A0%95-%F0%9F%92%AF-%EC%B4%9D%EC%A0%95%EB%A6%AC)

# React Query

: React앱에서 비동기 로직을 쉽게 다루게 해주는 라이브러리

## Client State vs Server State

- Client State : 세션간 지속적이지 않는 데이터
  - 동기적
  - 클라이언트가 소유
  - 항상 최신 데이터로 업데이트(렌더링에 반영)
  - e.g. 리액트 컴포넌트의 state, 동기적으로 저장되는 redux store 데이터
- Server State : 세션간 지속되는 데이터
  - 비동기적
  - 세션을 진행하는 client만 소유하는게 아니고 공유되는 데이터도 존재
  - 여러 client에 의해 수정될 수 있음
  - client에서는 서버 데이터의 snapshot만을 사용하기 때문에 클라이언트에서 보이는 서버 데이터는 항상 최신임을 보장 X
  - e.g. 비동기 요청으로 받아올 수 있는, 백엔드 DB에 저장되어 있는 데이터

## 초기 세팅

## 컨셉

### 1. 중요한 기본 사항

- Query는 4개의 상태를 가진다.

  1. fresh : 새롭게 추가된 쿼리 인스턴스 -> active 상태의 시작

  - 기본 staleTime=0이기 때문에 설정을 하지 않으면 호출이 끝나고 바로 stale상태로 변함
  - staleTime을 늘릴 경우 fresh한 상태가 유지 되는데, 이 때는 쿼리가 다시 마운트되어도 fetching이 발 생하지 않고 기존의 fresh한 값을 반환

  2. fetching : 요청을 수행 중인 쿼리
  3. stale : 인스턴스가 존재하지만 이미 fetching이 완료된 쿼리

  - 특정 쿼리가 stale 상태에서 같은 쿼리 마운트를 시도한다면 캐싱된 데이터를 반환하며 refetching 시도

  4. inactive : active 인스턴스가 하나도 없는 쿼리

  - inacitve된 이후 cacheTime 동안 캐시된 데이터가 유지 됨

- refetching 일어나는 경우
  1. 런타임에 stale인 특정 쿼리 인스턴스가 다시 만들어졌을 때
  2. window가 다시 포커스가 되었을때(옵션으로 끄고 키는게 가능)
  3. 네트워크가 다시 연결되었을 때(옵션으로 끄고 키는게 가능)
  4. refetch interval이 있을때 : 요청 실패한 쿼리는 디폴트로 3번 더 백그라운드단에서 요청하며, retry, retryDelay 옵션으로 간격과 횟수를 커스텀 가능하다.

### 2. Queries

```js
const { status, data, error, isFetching, isPreviousData } = useQuery(
  ['projects', page],
  () => fetchProjects(page),
  { keepPreviousData: true, staleTime: 5000 }
);
​
// 예외처리 -> reject쓰지말고 무조건 throw Error
const { error } = useQuery(['todos', todoId], async () => {
  if (somethingGoesWrong) {
    throw new Error('Oh no!');
  }
​
  return data;
});
```

- 쿼리는 server state를 요청하는 프로미스를 return하는 함수와 함께 unique key로 매핑 됨
- 인자 2개(필수) : 쿼리의 unique key, 프로미스를 리턴하는 함수
  - unique key : 한 번 refresh되었다면 계속 추적이 가능. refetching, caching 공유 등을 할 때 참조되는 값. 주로 배열을 사용.
    - 배열 : [쿼리의 이름, 프로미습 반환하는 함수의 인자]
- useQuery 반환값 : isLoading, isError, isSuccess, isIdle, status, error, data, isFetching
- 인자 1개(쿼리 옵션, 선택)
  - enabled : True로 설정 시 자동으로 쿼리의 함수 요청 X
  - keepPreviosData : success와 loading사이 널뛰기 듬지
  - placeholderData : mock 데이터 설정도 가능. 얘는 근데 캐싱이 안됨
  - initialData : 초기값 설정

### 3. Query Keys

```js
useQuery(['todo', 5, { preview: true }], ...)
// queryKey === ['todo', 5, { preview: true }]
```

- 인자
  - 문자열`'todo'` : 구별되는 문자열로 키를 줄 수 있음. 바로 인자가 하나인 배열로 변환됨
  - 배열 `['todo',5]` : 같은 문자열로 같은 key를 쓰면서도 id로도 구별이 가능
  - 콜백함수에 주는 인자 `5` : 배열의 마지막 요소이며, 쿼리를 구별. 엔드포인트가 갇더라도 요청에 넣는 body나 쿼리파람이 다르면 다른 쿼리 인스턴스로 취급

# Refrence

- [React-Query 살펴보기](https://maxkim-j.github.io/posts/react-query-preview/)

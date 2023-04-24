
- [파일](#파일)
  - [패키지](#패키지)
  - [이름](#이름)
- [정의](#정의)
  - [이름](#이름)
  - [선언](#선언)
- [Props](#props)
  - [선언](#선언)
  - [boolean 값 전달](#boolean-값-전달)
- [Hook](#hook)
  - [기본 Hook](#기본-hook)
    - [useState](#usestate)
    - [useCallback](#usecallback)
    - [useEffect](#useeffect)
  - [Custom Hook](#custom-hook)
    - [기본 선언](#기본-선언)
    - [Global State Management를 위한 DC Subscribing Custom Hook 구현하기](#global-state-management를-위한-dc-subscribing-custom-hook-구현하기)


파일
====

## 패키지

- 이름: 정의, 이름, 선언
- Props: 선언, boolean 값 전달
- Hook: 기본 Hook, useState, useCallback, useEffect, Custom Hook
- 기본 선언
- Global State Management를 위한 DC Subscribing Custom Hook 구현하기

### 이름

- 패키지: 각 도메인에 view 폴더 하위에 생성한다.
- 이름: 컴포넌트 이름과 동일하게 생성한다.

## 정의

### 이름

- UpperCamelCase
- 동일 도메인의 모델과의 구분을 위해 끝에 View를 붙인다.

### 선언

- 일관성, 가독성을 위해 화살표 함수는 사용하지 않고 function으로 통일한다.
- export default는 특별한 경우 아니면 지양한다. 기존 ts 컨벤션과 동일하다.

```typescript
// GOOD
function UserProfileView(props: {user: User}) {
    return (
        <div>
            ...
        </div>
    );
}

// BAD
const UserProfileView = (props: {user: User}) => {
    return (
        <div>
            ...
        </div>
    );
};
```

<br/>

## Props

- 상위 컴포넌트에서 결정되는 상태 값과 callback 정의한다.
- 사용하지 않지만 하위 컴포넌트에 넘겨주기 위해 받는 Props 값이 (Props Drilling) 2뎁스 이상이라면 글로벌 상태 관리를 고려한다. (DC)

### 선언

- 특별한 경우가 아니면 컴포넌트 function 선언시 파라미터 타입으로 명시한다.

```typescript
function UserProfileView(props: {id: number, name: string}) {
    return (
        <div>
            ...
        </div>
    );
}
```
- 다른 곳에서 props 타입이 필요한 경우 interface로 정의한다.
```typescript
export interface UserProfileViewProps {
  id: number;
  name: string;
}
```

<br/>

### boolean 값 전달
- 리액트 컴포넌트에 boolean 값을 전달할 때 프로퍼티 설정 여부가 곧 해당 boolean 값으로 전달 된다.
- 가독성을 위해 하단에 위치시킨다.

```javascript
// good
<InternalDirectoryMovePopupVC
  openPosition={...}
  menuWidth={...}
  paymentInfo={paymentInfo}
  devMode={devMode}
  useResize
/>

// bad
<InternalDirectoryMovePopupVC
  openPosition={...}
  menuWidth={...}
  useResize
  paymentInfo={paymentInfo}
  devMode={devMode}
/>
```

## Hook

### 기본 Hook

#### useState

- React의 가장 기본이 되는 hook이다.
- class component의 state와 setState와 동일한 역할을 한다.
- function component view 내부에서 data 변경 및 render(re-render)를 위해 사용한다.

```javascript
// function component
function UserProfileView(props: {
    // ...
}) {
    const [user, setUser] = useState<User>();
 
    const fetchUser = async () => {
        const res = await fetchUser();
        // 새로운 state를 parameter로 넘긴다. 
        setUser(res.data);
    }
  
    return (
        <>
            <ProfileView
                thumbnailImageUrl={user.profileImageUrl}
                title={user.name}
                onClick={fetchUser}
            />
            <Button>사용자 생성하기</Button>
        </>
    )
}
```

#### useCallback

- 함수 memoization을 위해 활용한다.
```javascript
// function component
function UserProfileView(props: {
    //    ...
 }) {
     
    const [user, setUser] = useState<User>();
     
    // useCallback으로 감싼 함수는 user instance가 변경될때마다 새롭게 생성된다. -> 그래서 객체 불변성 지켜줘야 한다. 그렇지 않으면 예상대로 동작하지 않을 것이다.
    // 따라서, user instance가 변경되지 않는다면 함수 자체가 memoization 된다.
    const onClick = useCallback((newName: string) => {
        // user name update 요청
        updateUserName(user.idx, newName);
  }, [user]);
 
  return (
    <>
        <ProfileView
            thumbnailImageUrl={user.profileImageUrl}
            title={user.name}
            onClick={onClick}
        />
        <Button>사용자 생성하기</Button>
    </>
  )
}
```

#### useEffect
- class component에서의 componentDidMount, componentDidUpdate, componentWillUnmount, 의 역할을 한다.
- dependency에 값을 넣을 경우, 해당 값 변경 시 실행되게 할 수도 있다.
```javascript
// function component
function UserProfileView(props: {
    userIdx
 }: {
    userIdx: number;
}) {
     
    const [user, setUser] = useState<User>();
 
    // 아래와 같이 사용하면 didUpdate처럼 props로 받은 userIdx 값이 변경할때마다 동작한다.
    const fetchUser = useEffect(async () => {
        const res = await fetchUser();
        // 새로운 state를 parameter로 넘긴다. 
        setUser(res.data);
   }, [userIdx]);
 
    const showAlert = useEffect(() => {
          
    }, [])
 
   
  
  return (
    <ProfileView
        thumbnailImageUrl={user.profileImageUrl}
        title={user.name}
    />
  )
}
```

#### Custom Hook
- Custom Hook은 최대한 작은 단위로 분리시켜야 한다.
- React에서 기본적으로 제공하는 useEffect, useCallback, useState를 활용하여 state 및 state 로직을 재사용하기 위해 활용한다.
- state와 일부 로직들이 Global 하게 사용될 경우, DC 구현에 대해 고민해야한다.
- 참고(기본 기능을 모아둔 React  Hooks  Library, 네이밍 참고하기도 좋음)   
  - https://usehooks.com/   
  - https://github.com/streamich/react-use

##### 기본 선언
- naming은 useXXXX로 선언한다.
  - useUser(), useThrottle(), useDebounce(), etc..
- 파라미터와 리턴값은 object로 선언한다.
- return 할 key와 value의 naming이 같을 경우, 굳이 재할당하지 않는다.

```javascript
function useUser(props: {
  //    ...
}) {
  const [user, setUser] = useState<User>();

  const fetchUser = useCallback(
    async () => {
      const res = await fetchUser();
      setUser(res.data);
    },
    [],
  );
  return {
    user,
    fetchUser
  }
```

#### Global State Management를 위한 DC Subscribing Custom Hook 구현하기
- 미리캔버스는 React Class Component + React Function Component +  Vanllia.js(TS Dom)으로 구성(구현)되어 있기 때문에 단순히 React Custom Hook으로만 Global State 관리를 할 경우, vanilla.js를 활용해야할 상황이 생길 경우 재사용이 어려워진다.
- **따라서 기본적으로 Global State 관리가 필요하다면 DC 구현 및 Custom Hook에 DC listener(interface)를 구현해야 한다.**
- (예졔) https://codesandbox.io/embed/dc-with-hook-d7g4tt?fontsize=14&hidenavigation=1&theme=dark

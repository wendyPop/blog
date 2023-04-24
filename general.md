1. 파일 & 디렉토리
  1-1. 디렉토리
  1.2파일
  1.3export
2. 클래스
 2.1이름
2.2생성자
2.3속성
2.4상속
2.5Interface
2.6Generic
2.7Deserialize & 객체 복제
2.8싱글톤
3메소드
3.1override
3.2implements
3.3파라미터 개수
3.4줄바꿈
4변수 & 상수
4.1변수 이름
4.2변수 선언
4.3Nullable
4.4상수
4.5Enum (type alias)
5조건문
5.1줄바꿈
6반복문
7비동기 처리
7.1Async 메소드
7.2await vs then
8기타
8.1들여쓰기
8.2함수
8.3레벨에 따른 분리
8.4주석
8.5Util
8.6null vs undefined

파일 & 디렉토리
===

### 디렉토리
##### GOOD

- 논리적으로 관련된 것들을 모은다. (응집성을 높이다.)
- 알림, 도움말, 캔버스 영역 등 각 도메인별로 파일을 모은다.
- 패키지 이름은 소문자로만 한다. Underscore 등을 넣지 않는다.
- CSS는 View에 종속된 것이니 View 폴더에 같이 넣는다.

##### BAD
- 기술적으로 비슷한 것들끼리 모은다 (CSS끼리, 팝업끼리, 액션 끼리...)

공통 컴포넌트는 src/shared/common/view/component/ 대분류에 맞게 위치시킨다.
```plantuml
/component
    /button
    /input
    /dropdown
    /radio
    ...
```

<br/>

### 파일
#### GOOD

- 파일 이름은 파일 내의 대표 클래스 이름과 동일하게 한다.
- 다른 패키지에 속해 있는 파일의 이름을 같게 만들지 않는다.
- 하나의 파일에 여러가지 모듈을 선언하지 않는다. 대표 모듈에 확실하게 종속된 것이 아니라면 분리한다.

#### BAD
- 동일한이름의 클래스/파일이 여러 패키지에 있다.

### export 
- ~~한 파일의 메인 모듈은 default~~ ← 모르겠음. 논의 필요.https://github.com/airbnb/javascript/issues/1365
- default export의 경우 단점으로 리팩토링, 트리쉐이킹의 문제가 제기됨. default를 사용하는 것에 장점이 없다면 쓰지 않는 것이 좋을 듯.


클래스
===

### 이름 
#### GOOD

- PascalCase
- 누가 사용하느냐가 아니라 뭘 하는 것이냐에 따라 이름을 정한다.
- 약어는 사용을 자제하고, 너무 길어지는 경우 도메인 별로 줄임말을 정해서 활용한다. 예) 공유뷰어를 SV로 정하고, SVFloatingMenuView 등과 같이 SV를 헤더로 붙인다.

#### BAD
- 리소스, 메소드 이름을 사용하는 곳의 용도에 따라 정한다.
- 무분별한 약어, 줄임말 사용

### 생성자
- TODO: 파라미터를 멤버 변수로 선언?
- TODO: 파라미터 개수 많을 때 object literal로 묶기?

### 속성
##### GOOD

- 접근 제한자를 적절하게 선택해서 클래스 외부에서는 필요한 것만 접근할 수 있도록 한다.
- 생성자에서 결정되고 변하지 않는 값들은 readonly를 붙인다.
- 클래스에서만 사용하는 정적인 값은 private static 으로 정의한다. (public static은 사용하지 않는다.)
- 멤버가 없어도 되면 없애야 한다.
- 다른 값으로부터 도출할수 있는 속성은 멤버로 하지 않고 메소드를 이용한다. (안그러면 date integrity가 깨지는 문제가 생긴다.)
- 동일한 이름의 멤버가 derived class에 반복적으로 나오면 super class로 옮긴다. 멤버 타입이 달라야 한다면 generics를 활용하면 된다.

##### BAD
- 동일한 이름의 멤버를 super, derived class에 중복 선언한다.

### 상속
##### GOOD

- 기능 확장을 위해 클래스에 속성, 메소드를 추가하는 방법과 derived class를 만들어 추가하는 방법 중에 최적의 방법을 찾아야 한다.
- 코드를 분리하는 차원에서 derived class를 생성하는 것도 좋다.
- Super class와 derived class는 부모 자식 관계가 아니고 IS A 관계이다. 즉 Derived class는 Super class이다. Super class의 모든 것은 Derived class 것이기도 하다.
##### BAD

- 기능 확장, 동작 오버라이딩 등이 아니고 단순 속성이 다르면 상속이 필요 없다. (필요한 경우도 있기는 하다)
- Derived class에 super class의 코드를 복붙한다.
- 공통된 동작이지만 옵션이 좀 다른 동작을 super class에서 하지 않고 derived class에서 다 따로 처리한다.
```javascript
// BAD
 
// 동작이 아니라 속성만 다른 경우이므로 ButtonGoHome을 class로 만들필요가 없다. instance면 충분하다.
export class ButtonGoHome extends Button {
    constructor() {
        super();
    }
 
    protected async doAction(): Promise<void> {
        await UnicornViewerManager.instance.dispatchAction(new GoHomeAction());
    }
 
    protected getIcon(): ToolsIcon {
        return ToolsIcon.HOME;
    }
 
    public getName(): string {
        return '미리캔버스 홈';
    }
}
```

### Interface
- Is A 관계인 경우 Inheritance로 해야 한다. SingleItemRenderer는 ItemRenderer이니 이런경우이다.
- Interface는 본질에 더해서 특정한 능력을 추가로 가질때 활용한다. Serializable, Clonable, ClickEventListener 등은 해당 클래스의 본질은 아니지만 추가적인 능력을 표현한다. 다른 클래스가 이런 능력만을 기대할때는 interface로 참조한다.
```javascript

// GOOD
class SingelItemRenderer extends ItemRenderer implements ClickEventListener
 
// BAD
class SingleItemRenderer implements ItemRenderer, TbpeDomRenderer
```

### Generic
##### GOOD

- View, ViewController의 overall 로직은 동일하지만 속성 타입이 다르다면, super class에서 Generic type으로 처리한다.
- 이 경우 모델도 상속 구조를 유지해야 한다.
##### BAD

- Derived class에서 같은 이름의 속성, 같은 속성 타입에 대한 메소드를 따로 또 선언한다.

```javascript
// GOOD
class ItemVC<ITEM extends Item> {
   private item: ITEM;
   public getItem(): ITEM { return this.item; }
}
 
class TextItemVC extends ItemVC<TextItem>{
    // item, getItem을 따로 정의하지 않는다.
}
 
// BAD
class ItemVC {
   private item: Item;
   public getItem(): Item { return this.item; }
}
 
class TextItemVC extends ItemVC {
   private item: TextItem;
   public getItem(): TextItem { return this.item; }
}
```
- 기존 클래스를 generic class로 변경하면 타입 선언한 곳을 모두 변경해줘어야 하니 default generic type을 활용하여 이를 최대한 방지할 수 있다.
```javascript
class SingleItemVC<TBPEITEM extends TbpeItemProperties = any>
// SingleItemVC는 SingleItem<any>와 동일하다
```

- Generic type으로부터 개체를 생성하려면 new T() 같이 해서는 컴파일이 되지 않는다.
- 이 경우 super() 등을 통해 T 타입에 대한 클래스 정의를 별도로 전달해줘야 한다.
- https://www.typescriptlang.org/docs/handbook/generics.html#using-class-types-in-generics
```javascript
// 생성자 전달
super(SingleItemVCContentsStates)
 
// 생성자 받는 쪽 파라미터 정의
interface NoParamConstructor<T> {
new (): T;
};
 
constructor(contentsConstructor: NoParamConstructor<SINGLEITEMVCCONTENTSSTATES>)
 
// 받은 생성자로부터 개체 생성
new contentsConstructor();
 
 
// 20200514 ParamConstructor 추가 (퇴)서동균 
type ParamConstructor<T> = new (...args: any[]) => T;
```

### Deserialize & 객체 복제
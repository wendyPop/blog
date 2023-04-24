미리캔버스 웹 코딩컨벤션 아키텍처
=

About
-
- 프로젝트를 구성하는 모듈, 폴더(패키지), 파일을 구성하는 기준을 제시한다.
- 백엔드, 프론트엔드, 안드로이드 등 특정 플랫폼과 무관하게 적용 가능하다.
- 참고 <span style="color:yellow"> - TODO 링크로만 첨부할 건지 확인 필요 </span><br/>
  - [(프론트엔드&공통) 코딩 가이드](https://wiki.miridih.com/pages/viewpage.action?pageId=115148681)
  - [텍스트 아키텍쳐](https://wiki.miridih.com/pages/viewpage.action?pageId=113248368)


MVC 확장 아키텍쳐
-
#### Major Principle

- 데이터 처리는 Model이 한다. public 멤버로 두고 너도나도 다 하면 안된다. Model은 Model들 이외의 것들이 세상에 있다는 걸 알면 안된다.
- Model 중심으로 생각해야 한다. Model은 구조체처럼 쓰고 액션을 하는 Helper, Render, Inspector 등과 같은 액션 클래스를 따로 만들지 않는다.
- 각종 Controller는 정말 컨트롤만 한다. 세부사항은 처리하지 않는다.
- View, ViewController, DataController 등은 모두 독립적으로 작동한다. 중앙집중화된 제어하지 않는다. 외부에서 제어하려면 내부 사정을 다 알아야 하고 복잡도가 매우 올라간다.
- ViewController(화면)는 세부사항을 처리하지 않으니 코드가 복잡할 이유가 없다.
- DataController는 데이터 컨트롤만 한다. 데이터 세부사항을 처리하지 않는다. 화면이 세상에 있다는 것도 몰라야 한다. Agent가 어디가서 데이터를 가져오는지도 몰라야 한다.
- View는 똑똑하면 안된다. 비즈니스 로직을 넣지 말고 범용이고 수동적으로 만든다. 직접 데이터를 변경 요청을 하거나 하지 않는다.
- API 연동 등은 Agent가 하는데, Agent는 시키는대로 데이터를 구해서 반환만 해야 한다.
- 자꾸 나오는 유틸리티성 코드는 따로 모은다.
- Data Store는 컨트롤러가 아니다 Model + DataController 이다. View 컨트롤은 하지 말아야 한다.


<span style="color:red"> - NOT TO DO</span><br/>




#### 모듈 종류 및 역할
| 구분             | 폴더 | 클래스 이름       | 역할                                                      | 쉬운 설명 | TO DO                                                                                                      | <span style="color:red">NOT TO DO</span>                                                                                                                                                                                                                                                                                                                                                                  |
|:---------------|:---|:-------------|:--------------------------------------------------------|:------|:-----------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Model          |/model|              | - 알람, 사용자정보 등 기초 데이터 <br/> - 데이터 manipulation, 변환, 계산 등 |화면과 무관하게 세상에 해당 entity에 대한 데이터와 로직만 안다.| - 데이터의 본질에 가장 맞는 타입으로 데이터 타입을 정하기  <br/> - 계산이 되는 데이터를 가지고 있지 않기  <br/> - 데이터 manipulation, 변환, 계산 직접 처리하기 | <span style="color:red"> - 구조체로만 활용하고 데이터 manipulation은 다른 클래스가 다 처리하기</span><br/><span style="color:red"> - 편의상 멤버를 public으로 해도 되지만, 이를 활용하여 단순 get/set 이상으로 외부에서 접근하기</span><br/><span style="color:red"> - 재활용 가능한 유틸리티성 코드 포함</span><br/><span style="color:red"> - View, ViewController, DataController, Agent에 접근하기</span><br/><span style="color:red"> - 데이터 본질과 맞지 않게 API가 제공한 형태로 데이터 타입 정의</span><br/> |
| View           |/view| ~View        | - 화면을 구성하는 재사용 가능한 뷰 (텍스트필드, 메시지팝업, 레이블...)             |뷰를 그리기 위해 필요한 데이터와 이벤트 처리 정도만 아는 모듈| - 뷰에서 사용하는 상태 값 초기화 <br/> - 뷰 생성 <br/> - 이벤트에 따라 상태값 변경 <br/> - 화면 렌더링                                     | <span style="color:red"> - ViewController, Agent에 접근하기</span><br/><span style="color:red"> - DataController에 접근 (단, 접근 과정이 너무 길어서 번거로우면 제한적으로 접근 허용, ~~ActiveView로 네이밍)</span><br/><span style="color:red"> - 데이터 manipulation</span>                                                                                                                                                                     |
| ViewController |/vc| ~VC          | - 화면 구성, 제어                                             |화면 구성을 위해 View 구성하고, 뷰가 필요로 하는 데이터를 DataController로부터 받아다가 제공해주는 컨트롤만 한다. 뷰와 모델의 세부사항은 모른다. | - 화면 생성/구성 <br/> - 데이터를 받아다가 뷰에다 전달 <br/> - View가 제공한 이벤트/데이터 받아서 DataController에 전달                       | <span style="color:red"> - 데이터 manipulation</span><br/><span style="color:red"> - 유틸리티성 코드</span><br/><span style="color:red"> - 세부 비즈니스 로직 처리</span><br/>                                                                                                                                                                                                                                                |
| DataController |/dc| ~DC          | - 특정 도메인 데이터 보관, 처리, 제어                                 |데이터를 Agent로부터 받아서 보관하고 달라면 준다. 데이터 처리 세부사항은 모른다. 제어만 한다. 세상에 뷰가 있다는 걸 모른다.| - 데이터 요청 받아서 Agent에게 요청 <br/> - 데이터 받으면 리스너에게 제공 <br/> - 데이터 보관, 제어                                        | <span style="color:red"> - View, ViewController 접근</span><br/><span style="color:red"> - 데이터 세부 manipulation</span><br/>                                                                                                                                                                                                                                                                                                                                                                                                          | |
| Controller     |/controller| 	~Controller | - 여러 ViewController, DataController를 종합적으로 제어           |제어가 복잡한 경우에만 도입| - 고차원적인 로직, 화면 제어 등 처리<br/> - 화면 제어, 데이터 제어 명령<br/>                                                        |<span style="color:red"> - 화면 세부 제어</span><br/><span style="color:red"> - 데이터 세부 제어</span><br/><span style="color:red"> - Data manipulation</span><br/>|
| Agent          | /agent    | ~Agent       | - 서버, 파일, 외부 서비스 등 접근                                   |요청 받은 데이터를 받아서 전달한다. | - 요청을 잘 포장하여 API에 전달 <br/> - 받은 응답 파싱하여 Model 타입 등으로 반환<br/>                                               |<span style="color:red"> - View, ViewController, DataController, Controller 접근</span><br/>|
| Util           | /util     | ~Util        | - 재활용 가능 유틸리티                                                      |범용 코드는 도메인 별로 따로 작성한다.| - 재활용 가능한 유틸리티성 작업<br/>                                                                                    |<span style="color:red"> - View, ViewController, DataController, Controller 접근</span><br/><span style="color:red"> - 상태 유지</span><br/><span style="color:red"> - 매우 특정한 모델 등에 밀접한 잡다한 코드들 모으기</span><br/>|


// todo 이미지 추가

백엔드에 적용
- View, ViewController 빼고는 다를게 없다.
- ServerAgent 부분은 DatabaseAgent로 변경해서 이는 DB에 접근하기 위한 용도로만 사용한다. 여기에는 비즈니스 로직을 넣지 않도록 한다.
- API 호출을 받고 응답을 보내는 것은 DataController라기 보다는 클라이언트 agent에 더 가깝다.. 따라서 DataController라기 보다는 ApiController 등이 더 적합할 듯...

프론트엔드 View, ViewController 재사용 전략
- <span style="color:red">비슷한 코드를 copy & paste 하지 않는다! 찾아보면 방법은 있다.</span>
- View는 매우 단순해야 한다. 데이터 변경, Action을 날리는 등 Controller가 할일을 하지 않아야 재활용 가능성이 높아진다.
- View, ViewController는 상속 구조로 확장한다. 
  - class BView extends AView
- 상속에 따라 처리하는 데이터 타입이 바뀌면 이는 typescript의 generic type을 활용한다.
  - class AView<AMODEL extends AModel>
  - class BView extends AView<BModel>
- 데이터 타입도 상속으로 처리한다.
  - BModel extends AModel
- Derived class에서는 메소드 overriding 등을 활용하여 super class와 다른 부분만 코딩한다.
- super class의 메소드 중간에 다른 코드가 들어가야 하면 super class에 옵션 멤버를 두던가, super class method에서 중간에 abstract 메소드를 호출하고, 이를 derived class에서 오버라이딩 한다.

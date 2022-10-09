---
title: 계산기 with keyboard event
meta:
- name: description
  content: make calculator
- property: og:title
  content: calculator
- property: og:url
  content: https://wendypop.github.io/blog/UI/calculator/
  tags: ["components", "ui-component", "calculator" ]
---

<Calculator/>
키보드로도 계산해보세요. :tada:



<br/>


### 계산기 구현에 관련된 이야기
- KeyboardEvent API 
- 프레임워크 없이, 라이브러리 없이 작업
- 컴포넌트화도 하기

### 계산기 구현시 필요한 것들! 생각하는 시간을 가져봅시다.
1. 필요한 버튼 : `온점(.)`, `사칙연산( + - * /)` 기호, `계산하기(=)` 기호, `Clear` 버튼
3. 오류처리 구상
   - 결과창 초기값 0.첫입력이 들어올 때, 0을 지우고선 값 표시하기 위한 처리
   - 키보드입력을 받을시 숫자키와 필요한 키들만 입력받기
   - null 체크
   - eval 수행 실패시 에러처리

### 키보드 이벤트에 대하여

![before](~@source/.vuepress/assets/img/ui/KeyEvent.png)
이미지상의 가장 상위 인터페이스인 Event 객체는 Object 객체를 상속받으며 Event, UIEvent, KeyboardEvent 모두 생성자 함수입니다.
즉 상위 객체의 기능 또한 모두 포함하고 있습니다. 이벤트 모델의 심도깊은 공부도 곁들이면 좋을 것 같습니다.

keyboardEvent 의 type 은  `keydown`, `keyup`, `keypress` 이 있는데 keydown 과 keypress 는 비슷해보이지만 약간의 차이가 있으며 [keypress 는 권장사항이 아닙니다.](https://developer.mozilla.org/en-US/docs/Web/API/Element/keypress_event)
두 이벤트의 차이는 `keydown` 이벤트는 control, options, shift, tab, delete, 방향키, 문자, 숫자, 특수 문자키 등 즉 모든 키를 눌렀을 때 발생하는 이벤트이며 (`keyup` 이벤트도 마찬가지)
`keypress` 이벤트는 문자, 숫자, 특수 문자키를 눌렀을 때만 발생합니다.

```js

// 파라미터로 받은 event 객체를 뒤져보자
document.addEventListener('keydown', (event) => {
  event.key === 'Enter' ? 엔터키 누름 : 엔터키 아님
  // event.keyCode === 13 ? 엔터키 누름 : 엔터키 아님
  // event.altKey ? alt키 누름 : 아님
  // event.shiftKey ? shift 누름 : 아님
  // event.ctrlKey .. so on
})
```
### KeyboardEvent 객체에는 어떤 정보가 ?

수많은 정보를 제공하지만 `alt, ctrl, shift`키가 같이 눌렸는지 알수 있고
`metaKey` 속성으로 OS별 `⌘ Command`나 `⊞` 키 활성화 여부도 알 수 있습니다. <br/>
예전에는 `key` 속성 말고도  `keyCode` 속성도 구분자로 사용했지만 이 속성도 이제는 deprecated되어 key 속성을 대신 사용하라고 MDN 에서 권장합니다.  

<br/>

![before](~@source/.vuepress/assets/img/ui/keycode.png)
keyCode 는 무려 249개나 되고 위 이미지는 일부만 발췌한 건데도 상당합니다.  
엔터키는 13, ESC는 27....바로바로 알아먹기 어렵습니다. 직관적인 key 속성 사용 권장에 동감이 되네요.
하지만 레거시 프로젝트들은 여전히 사용 중 일테니 알아두긴 해야 할 것 같습니다.
입력한 키와 keyCode 대응 관계는 [여기](https://www.toptal.com/developers/keycode) 에서 편리하게 확인할 수 있네요.  

다시 key로 돌아와서  
key 의 대응관계는 `'Control', 'Enter','Shift','Enter','Ctrl','Enter'` 등 다양하지만 
자주 사용하는 key 값들은 익혀두되 나머지는 [공식문서](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values) 를 참고하는 것이 가장 믿음직스러울 것 같습니다.

<br/>
<br/>

계산기를 구현하면서 사용해본 key 값들은 몇 개 안됩니다.  
엔터키, 뒤로가기, esc 하고 몇개의 숫자키 들
```js
document.addEventListener('keydown', function(keyEvent){
  // 계산기 모양과 동일하게 자료 구성
  // 엔터, esc, 뒤로가기 버튼들만 대응하고 이외의 key 들은 팅!
  let numbers = [
    '1', '2', '3', '/',
    '4', '5', '6', '-',
    '7', '8', '9', '+',
    '.', '0', '*', '=',
    'Enter', 'Escape', 'Backspace'
  ]
  if (numbers.includes(keyEvent.key)) {
    // 다 좋은데, 9항 연산. 실무에선 이렇게 하지 맙시다
    keyEvent.key === 'Enter' ? calculate() :            // 엔터면 계산 시작
      keyEvent.key === '=' ? calculate() :              // = 여도 계산 시작
      keyEvent.key === 'Escape' ? clearScreen() :       // esc 면 다 지워버려
        keyEvent.key === 'Backspace' ? removeTail() :   // 뒤로가기면 한 자씩 지우자
          display(keyEvent.key)                         // 다 아니라면 입력받은 숫자 표시!
  }
})
```

### 바로 완성본 입니다.
#### html, css, js 버전
```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>simple calculator</title>
        <link rel="stylesheet" href="./style.css">
    </head>

    <body>
        <table class="calc">
            <tr>
                <td colspan="3" class="outputtext">
                    <!--입력이 안되도록 disabled 처리-->
                    <label for="result"><input type="text" class="display-box" id="result" value="0" disabled></label>
                </td>
                <td>
                     <!--js를 속성방식으로 바인딩! 스크립트에서 input[type="button"] 들 데려다가 하나씩 루프돌며 이벤트 핸들러를 부착해도 됨-->
                    <input type="button" class="button clear_button" value="C" onclick="clearScreen()">
                </td>
            </tr>
            <tr>
                <td>
                    <input type="button" class="button" value="1" onclick="display('1')">
                </td>
                <td>
                    <input type="button" class="button" value="2" onclick="display('2')">
                </td>
                <td>
                    <input type="button" class="button" value="3" onclick="display('3')">
                </td>
                <td>
                    <input type="button" class="button" value="/" onclick="display('/')">
                </td>
            </tr>
            <tr>
                <td>
                    <input type="button" class="button" value="4" onclick="display('4')">
                </td>
                <td>
                    <input type="button" class="button" value="5" onclick="display('5')">
                </td>
                <td>
                    <input type="button" class="button" value="6" onclick="display('6')">
                </td>
                <td>
                    <input type="button" class="button" value="-" onclick="display('-')">
                </td>
            </tr>
            <tr>
                <td>
                    <input type="button" class="button" value="7" onclick="display('7')">
                </td>
                <td>
                    <input type="button" class="button" value="8" onclick="display('8')">
                </td>
                <td>
                    <input type="button" class="button" value="9" onclick="display('9')">
                </td>
                <td>
                    <input type="button" class="button" value="+" onclick="display('+')">
                </td>
            </tr>
            <tr>
                <td>
                    <input type="button" class="button" value="." onclick="display('.')">
                </td>
                <td>
                    <input type="button" class="button" value="0" onclick="display('0')">
                </td>
                <td>
                    <input type="button" class="button" value="*" onclick="display('*')">
                </td>
                <td>
                    <input type="button" class="button calculate_button" value="=" onclick="calculate()">
                </td>
            </tr>
        </table>
        <script type="text/javascript" src="script.js"></script>
    </body>
</html>
```
```css
* {
    margin: 0;
}
body {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-x: hidden;
    flex-direction: column;
    background-color: #219123;
    /* gradient 가 좋다*/
    background: linear-gradient(62deg, #b6fb7e 0%, #1f7a06 100%);
}
.calc {
    padding: 20px;
    border-radius: 1em;
    height: 500px;
    width: 400px;
    margin: auto;
    background-color: #ffffff;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.637);
}
.display-box {
    font-family: 'Orbitron', sans-serif;
    background-color: white;
    border: solid black 1px;
    color: black;
    border-radius: 5px;
    width: 95%;
    height: 55%;
    outline: none;
    font-size: 22px;
}
.button {
    font-family: 'Orbitron', sans-serif;
    background-color: black;
    color: white;
    border: solid black 1px;
    width: 80px;
    border-radius: 5px;
    height: 60%;
    outline: none;
    font-size: 30px;
    cursor: pointer;
}
.button:active {
    background: rgba(0, 0, 0, 0.568);
    -webkit-box-shadow: inset 0 0 5px #e5e5e5;
    -moz-box-shadow: inset 0 0 0 5px #219123;
    box-shadow: inset 0 0 5px #ffffff;
}
.clear_button {
    background-color: #219123;
}
.calculate_button {
    background-color: #219123;
}

```

```js{40-56}
// 결과창 내용 지우기
const clearScreen = () => {
  document.getElementById("result").value = 0
}

// 결과창 내용 표시하기
const display = (val) => {
  // default 로 display 되어있는 0 을 지워주자
  if(document.getElementById("result").value === '0'){
    document.getElementById("result").value = '';
  }
  document.getElementById("result").value += val
}

// 계산
const calculate = () => {
  let p = document.getElementById("result").value
  if (p) {
    try{
      document.getElementById("result").value = eval(p)
    }catch(e){
      // eval 수행시 오류 발생 에러 캐치
      document.getElementById("result").value = '입력오류';
    }
  } else {
    // null 체크
    alert('계산할 수치를 입력해주세요')
  }
}

// 키보드 backspace 이벤트 대응하여 한 자씩 지우기
const removeTail = () => {
  let temp = document.getElementById("result").value
  let poppedArray = temp && [...temp]
  poppedArray.pop()
  document.getElementById("result").value = poppedArray.join('')
}

// 키보드 이벤트 처리
document.addEventListener('keydown', function(keyEvent){
  // 계산기 모양과 동일하게 자료 구성
  // 이외의 key 들은 팅
  let numbers = [
    '1', '2', '3', '/',
    '4', '5', '6', '-',
    '7', '8', '9', '+',
    '.', '0', '*', '=',
    'Enter', 'Escape', 'Backspace'
  ]
  if (numbers.includes(keyEvent.key)) {
    keyEvent.key === 'Enter' ? calculate() :
      keyEvent.key === '=' ? calculate() :
      keyEvent.key === 'Escape' ? clearScreen() :
        keyEvent.key === 'Backspace' ? removeTail() :
          display(keyEvent.key)
  }
})

```
#### vue2 컴포넌트
현재 페이지 상단에 구현된 계산기 코드 전체입니다. 
모던 프레임워크로 만들면 DX 가 정말 좋아지는 것 같습니다. <br/>
노 프레임워크로 제작시 대략 1시간 가량 소요됬다면, vue 로 제작하는데 (js 버전의 산출물을 참고했다곤 해도) 5분도 안 걸렸구요.

```vue
<template>
  <div class="body">
    <table class="calc">
      <tr>
        <td colspan="3" class="outputtext">
          <label for="result"><input type="text" class="display-box" id="result" v-model="result" value="0" disabled></label>
        </td>
        <td>
          <input type="button" class="button clear_button" value="C" @click="clearScreen()">
        </td>
      </tr>
      <tr>
        <td>
          <input type="button" class="button" value="1" @click="display('1')">
        </td>
        <td>
          <input type="button" class="button" value="2" @click="display('2')">
        </td>
        <td>
          <input type="button" class="button" value="3" @click="display('3')">
        </td>
        <td>
          <input type="button" class="button" value="/" @click="display('/')">
        </td>
      </tr>
      <tr>
        <td>
          <input type="button" class="button" value="4" @click="display('4')">
        </td>
        <td>
          <input type="button" class="button" value="5" @click="display('5')">
        </td>
        <td>
          <input type="button" class="button" value="6" @click="display('6')">
        </td>
        <td>
          <input type="button" class="button" value="-" @click="display('-')">
        </td>
      </tr>
      <tr>
        <td>
          <input type="button" class="button" value="7" @click="display('7')">
        </td>
        <td>
          <input type="button" class="button" value="8" @click="display('8')">
        </td>
        <td>
          <input type="button" class="button" value="9" @click="display('9')">
        </td>
        <td>
          <input type="button" class="button" value="+" @click="display('+')">
        </td>
      </tr>
      <tr>
        <td>
          <input type="button" class="button" value="." @click="display('.')">
        </td>
        <td>
          <input type="button" class="button" value="0" @click="display('0')">
        </td>
        <td>
          <input type="button" class="button" value="*" @click="display('*')">
        </td>
        <td>
          <input type="button" class="button calculate_button" value="=" @click="calculate()">
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      result: ''
    }
  },
  mounted() {
    document.addEventListener('keydown', this.getKeyboardInput)
  },
  destroyed() {
    // 위 addEventListener에 전달한 인수와 인수가 같아야 이벤트 핸들러가 제거된다.
    document.removeEventListener('keydown', this.getKeyboardInput)
  },
  methods: {
    clearScreen() {
      this.result = 0
    },
    display(val) {
      if(this.result === 0){
        this.result = ''
      }
      this.result += val
    },
    calculate() {
      if (this.result) {
        try{
          this.result = eval(this.result)
        }catch(e){
          this.result = '입력오류'
        }
      } else {
        alert('계산할 수치를 입력해주세요')
      }
    },
    removeTail() {
      let poppedArray = this.result && [...this.result]
      poppedArray.pop()
      this.result = poppedArray.join('')
    },
    getKeyboardInput(keyEvent){
      let numbers = [
        '1', '2', '3', '/',
        '4', '5', '6', '-',
        '7', '8', '9', '+',
        '.', '0', '*', '=',
        'Enter', 'Escape', 'Backspace'
      ]
      if (numbers.includes(keyEvent.key)) {
        keyEvent.key === 'Enter' ? this.calculate() :
            keyEvent.key === '=' ? this.calculate() :
                keyEvent.key === 'Escape' ? this.clearScreen() :
                    keyEvent.key === 'Backspace' ? this.removeTail() :
                        this.display(keyEvent.key)
      }
    }
  }
}
</script>
<style scoped>
table {
  display: inline-block;
  border-collapse: inherit;
}
td {
  border: 0
}
/* 해당 블로그에 맞추느라 높이등의 스타일링이 위 버전과 조금 차이가 있음*/
.body {
  height: 50vh;
  border-radius: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
  flex-direction: column;
  background-color: #219123;
  background-image: linear-gradient(62deg, #b6fb7e 0%, #1f7a06 100%);
}
.calc {
  padding: 20px;
  border-radius: 1em;
  width: auto;
  margin: auto;
  background-color: #ffffff;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.637);
}
.display-box {
  font-family: 'Orbitron', sans-serif;
  background-color: white;
  border: solid black 1px;
  color: black;
  border-radius: 5px;
  width: 95%;
  height: 55%;
  outline: none;
  font-size: 22px;
}
.button {
  font-family: 'Orbitron', sans-serif;
  background-color: black;
  color: white;
  border: solid black 1px;
  width: 80px;
  border-radius: 5px;
  height: 60%;
  outline: none;
  font-size: 30px;
  cursor: pointer;
}
.button:active {
  background: rgba(0, 0, 0, 0.568);
  -webkit-box-shadow: inset 0 0 5px #e5e5e5;
  -moz-box-shadow: inset 0 0 0 5px #219123;
  box-shadow: inset 0 0 5px #ffffff;
}
.clear_button {
  background-color: #219123;
}
.calculate_button {
  background-color: #219123;
}

</style>

```

<Comment />

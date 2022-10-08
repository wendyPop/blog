---
title: 스톱 워치
meta:
- name: description
  content: make stop watch
- property: og:title
  content: stop watch
- property: og:url
  content: https://wendypop.github.io/blog/UI/stopwatch/
  tags: ["components", "ui-component", "stop-watch"]
---

<StopWatch />


> 아래 코드는 <u>프레임워크 없이 html, css, javascript 구현물</u>입니다.
<br/>
> vue 나 react 등에 적용하고 싶다면, 상황에 맞게 적용하면 ok !
<br/>

#### 스탑워치를 구현할 때 필요한 API
- Date API
- 타이머 API ( setInterval, clearInterval )
- event API ( addEventListener )


### 간단 로직 
```plain
1. 대기
2. 사용자가 시작버튼(▶) 을 누른다.
3. 1초마다 카운트업한다.
4. 3번을 반복
(e) 사용자가 일시정지(⏸)버튼을 누르면 타이머가 멈춘다.
(e) 사용자가 초기화(🔁)버튼을 누르면 타이머가 0초로 초기화되고 1번 대기상태가 된다.
```

```html
<!--index.html-->

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE-edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>STOP WATCH</title>
        <!-- 오랜만에 외부 파일로 순수 css 파일 로드 -->
        <link rel="stylesheet" href="style.css"/>
        <!--바닐라 스크립트 버전에는 font-awesome 아이콘 사용-->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"/>
    </head>
    <body class="flex">
        <div class="container flex">
            <div class="stopwatch flex">
                <h1>STOP WATCH</h1>
                <div class="circle flex">
                    <!--숫자 표시-->
                    <span class="time" id="display">00:00:00</span>
                </div>
            </div>
        </div>
        <div class="controls">
            <!--시작 버튼-->
            <button class="buttonPlay">
                <i class="fa-solid fa-play" id="playButton"></i>
            </button>
            <!--일시정지 버튼-->
            <button class="buttonPlay">
                <i class="fa-solid fa-circle-pause" id="pauseButton"></i>
            </button>
            <!--초기화 버튼-->
            <button class="buttonReset">
                <i class="fa-solid fa-shuffle" id="resetButton"></i>
            </button>
        </div>

        <!-- 랜터 트리 구성에 방해되지 않도록 스크립트는 나중 처리! -->
        <script src="script.js"></script>
    </body>
</html>
```
```css
/* style.css */
body {
    width: 100%;
    height: 100vh;
    margin-top: 200px;
    background-color: white;
}
.flex {
    display: flex;
    align-items: center;
    flex-direction: column;
}
.container {
    width: 50%;
    flex-direction: column;
}
.stopwatch {
    flex-direction: column;
}
.stopwatch h1 {
    font-family: "American Typewriter", serif;
    font-size: 50px;
    margin-bottom: 40px;
    text-align: center;
}
.circle {
    width: 240px;
    height: 240px;
    border-radius: 50%;
    box-shadow: rgba(50, 50, 93, 0.25)
        0 50px 100px -20px,
            rgba(0, 0, 0, 0.3)
            0 30px 60px -30px,
            rgba(10, 37, 64, 0.35)
                0 -2px 6px 0 inset;
}
.circle span {
    font-weight: lighter;
    font-size: 30px;
    line-height: 240px;
}
.controls button {
    background-color: transparent;
    border: none;
    outline: none;
}
.controls button i {
    margin: 0 20px;
    cursor: pointer;
    font-size: 30px;
}
.controls {
    margin-top: 50px
}
/* 나중에 스크립트로 핸들링할 버튼요소*/
#playButton {
    display: block;
}
#pauseButton {
    display: block;
}

@media only screen and (max-width: 600px) {
    body {
        margin-top: 50%;
    }
}
```
```js
// script.js

// 필요한 값들 모음  
let startTime
let elapsedTime = 0
let timerInterval

// 화면 요소들 담아두기
let playButton = document.getElementById('playButton')
let pauseButton = document.getElementById('pauseButton')
let resetButton = document.getElementById('resetButton')

// 시작버튼(▶) 클릭
const start = () => {
  startTime = Date.now() - elapsedTime
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime
    print(timeToString(elapsedTime))
  }, 10)
  showButton('PAUSE')
}

// 일시정지(⏸)버튼 클릭
const pause = () => {
  clearInterval(timerInterval)
  showButton('PLAY')
}

// 초기화(🔁)버튼 클릭
const reset = () => {
  clearInterval(timerInterval)
  print('00:00:00')
  elapsedTime = 0
  showButton('PLAY')
}

// 이벤트 핸들러 부착해두기
playButton.addEventListener('click', start)
pauseButton.addEventListener('click', pause)
resetButton.addEventListener('click', reset)

// 시간 표시 함수
function print(txt) {
  document.getElementById('display').innerHTML = txt
}

// 시작 또는 일시정지 버튼 toggle 
function showButton( key ) {
  const buttonToShow = key === 'PLAY' ? playButton : pauseButton
  const buttonToHide = key === 'PLAY' ? pauseButton : playButton
  buttonToShow.style.display = 'block'
  buttonToHide.style.display = 'none'
}

// 시간 포맷팅
function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs)

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin)

  let diffInSec = (diffInMin - mm) * 60
  let ss = Math.floor(diffInSec)

  let diffInMs = (diffInSec - ss) * 100
  let ms = Math.floor(diffInMs)

  let formattedMM = mm.toString().padStart(2, '0')
  let formattedSS = ss.toString().padStart(2, '0')
  let formattedMS = ms.toString().padStart(2, '0')

  return `${formattedMM} : ${formattedSS} : ${formattedMS}`
}
```





<Comment />

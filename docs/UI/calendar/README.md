---
title: 달력
meta:
- name: description
  content: make calendar
- property: og:title
  content: calendar
- property: og:url
  content: https://wendypop.github.io/blog/UI/calendar/
  tags: ["components", "ui-component", "calendar" ]
---

<Calendar />



<br/>


### 달력 구현시 필요한 것들! 생각하는 과정을 거쳐봅니다.

<br/>

**이번달 1일과 마지막 일자 구하기**
- 월마다 마지막 일자가 다르기 때문에 계산이 필요합니다.
- 이번 달 마지막 일자를 구하면, 그 요일 구하기. 왜 구하냐면 다음 달 1일의 위치를 알수 있습니다.
  - ex: 2022년 9월 30일은 금요일입니다. 자바스크립트에서 getDay()로 구한 금요일은 5입니다. 그럼 2022년 10월 1일은 토요일(6)이니 이 6을 인덱스로 활용하여 이용해서 달력을 그립니다.
- 지난 달의 마지막 일자 구하기. 이번 달 1일의 위치를 알 수 있습니다.
  <br/>
  <br/>
**요일 구하는 메서드**
    - 날짜객체.getDay()     // 요일
    - 날짜객체.getDate()  // 일
    - new Date(연도, 월, 0).getDate() 하면 지난달의 마지막 일을 구할 수 있습니다.
    - new Date(연도, 월, 0).getDay() 하면 지난달 마지막 일의 요일이 구해집니다.
    - new Date(연도, 월+1, 0).getDate() 하면 이번달의 마지막 일이 구해집니다.
```js
let today = new Date()

// 이번달의 막일 
new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()

// 지난달의 막일
new Date(today.getFullYear(), today.getMonth(), 0).getDate()

// 이번달의 막일의 요일
new Date(today.getFullYear(), today.getMonth() + 1, 0).getDay()

```

<br/>

**오늘 일자 구하기** 

<img
src="~@source/.vuepress/assets/img/ui/getToday.png"
width="300"
/>
```js{6-7}
let today = new Date()
let lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()

// 1 일부터 마지막 날짜까지 순환
for (let i = 1; i <= lastDate; i++) {
    if ( i === new Date().getDate() && today.getMonth() === new Date().getMonth()) {
      // 오늘
    } else {
      // 오늘 이외의 일자
    }
}
```

### 완성본 
#### html, css, js 버전
사실 바닐라스크립트로 짜는게 더 재밌습니다.  
하지만 간단한 구현체이기도 하고, 당장 간단히 구현하기에 재미있다는 것이지
유지보수성과 협업, 성능 등 많은 점을 고려해보면 모던 프레임워크가 좋습니다.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <title>Calendar</title>
    <link rel="stylesheet" href="style.css"/>
</head>
<body class="flex">
    <div class="container flex">
        <div class="calendar">
            <div class="month flex">
                <img class="prev" src="./paging_03.png" alt="">
                <div class="content">
                    <h1>MAY</h1>
                    <p>Wed May 11th 2022</p>
                </div>
                <img class="next" src="./paging_04.png" alt="">
            </div>
            <div class="weekdays flex">
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thur</div>
                <div>Fri</div>
                <div>Sat</div>
            </div>
            <div class="days flex">
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}
.flex {
    display: flex;
    align-items: center;
    justify-content: center;
}
.container {
    width: 100%;
    height: 100vh;
    background-color: rgb(33, 32, 32);
}
.calendar {
    width: 430px;
    height: 500px;
    background-color: white;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.669), -10px -10px 20px rgba(0, 0, 0, 0.436);
}
.calendar .month {
    width: 100%;
    height: 20%;
    padding: 20px 30px;
    background-image: linear-gradient(90deg, #ff9a8b 0%, #ff6a88 55%, #ff99ac 100%);
    justify-content: space-between;
    text-align: center;
}
.calendar .month img {
    width: 10px;
    height: 10px;
    cursor: pointer;
    transition: 0.1s;
}
.calendar .month img:hover {
    opacity: 0.8;
}
.calendar .month h1 {
    text-transform: uppercase;
    font-size: 30px;
}
.calendar .month p {
    font-weight: 300;
    color: rgba(0, 0, 0, 0.797);
    font-family: "Avenir Next", sans-serif;
}
.weekdays {
    width: 100%;
    padding: 10px 10px 0 10px;
    height: 10%;
}
.weekdays div {
    width: calc(430px / 7);
    height: 80%;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    margin: 0 5px;
    transition: 0.2s;
}
.days {
    width: 100%;
    height: 70%;
    flex-direction: row;
    flex-wrap: wrap;
    margin: auto;
    padding: 30px 10px;
    padding-top: 0;
}
.days div {
    width: calc(400px / 7);
    height: calc(400px / 7);
    text-align: center;
    font-size: 13px;
    font-family: "Avenir Next", sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.1s;
}
.days .previous-days,
.days .next-days {
    color: rgba(0, 0, 0, 0.349)
}
.days .today {
    background-color: #ff6a88;
    cursor: pointer;
    color: white;
    border-radius: 50%;
    transition: 0.2s;
}
.days .today:hover {
    background-color: #f95c79;
}
.days div:not(.today):hover {
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.215);
    cursor: pointer;
}
```
```js
const date = new Date();

const renderCalendar = () => {

  const monthDays = document.querySelector('.days')
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate()
  const firstDayIndex = date.getDay()
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

  const nextDays = 7 - lastDayIndex - 1;
  const months = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ]

  document.querySelector('.content h1').innerHTML = months[date.getMonth()]
  document.querySelector('.content p').innerHTML = new Date().toDateString()

  let days = '';

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="previous-days day">${prevLastDay - x + 1}</div>`
  }

  for (let i = 1; i <= lastDay; i++) {
    if ( i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
      days += `<div class="today day"> ${i} </div>`
    } else {
      days += `<div class="day"> ${i} </div>`
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-days day"> ${j} </div>`
    monthDays.innerHTML = days;
  }
}


document.querySelector('.prev').addEventListener('click', () => {
  date.setMonth(date.getMonth() -1);
  renderCalendar()
})

document.querySelector('.next').addEventListener('click', () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar()
})

// 라이브 이벤트 핸들러 부착
document.addEventListener('click', e => {
  if (e.target.closest('.day')) {
    let all = document.querySelectorAll('.day')
    for ( let elem of all) {
      elem.classList.remove('today')
    }
    e.target.classList.add('today')
  }
})

renderCalendar()

```


#### vue 버전!

```vue
<template>
  <div class="flex">
    <div class="container flex">
      <div class="calendar">
        <div class="month flex">
          <img class="prev" src="./../assets/img/ui/paging_03.png" alt="" @click="prevClick">
          <div class="content">
            <h1> {{ monthText }} </h1>
            <p> {{ fullDate }} </p>
          </div>
          <img class="next" src="./../assets/img/ui/paging_04.png" alt="" @click="nextClick">
        </div>
        <div class="weekdays flex">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thur</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div class="days flex">
          <!--지난달 -->
          <div v-for="n in firstDayIndex" :key="n" class="previous-days day">
            {{ prevLastDay - n + 1 }}
          </div>
          <!-- 1일부터 마지막날까지 -->
          <template v-for="i in lastDay">
            <template v-if="i === new Date().getDate() && date.getMonth() === new Date().getMonth()">
              <div class="today day"> {{i}} </div>
            </template>
            <template>
              <div class="day"> {{i}} </div>
            </template>
          </template>
          <!--다음달. nextDays 가 5라면 n은 1부터 5까지 순환 출력. 1부터 시작됩니다. -->
          <div v-for="j in nextDays" class="next-days day"> {{j}} </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      date: '',
      monthText: '',
      fullDate: '',
      months: [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ],
      firstDayIndex: 0,  // 이번달 첫날의 요일 ( 1이면 월요일, 6이면 토요일 )
      prevLastDay: 0,    // 지난달 마지막 일자
      lastDay : 0,       // 이번달 마지막일 자
      nextDays: 0        // 다음달 N일
    }
  },
  created() {
    this.date = new Date()
    this.renderMonthText()
  },
  mounted() {
    document.addEventListener('click', this.todayDisplay)
    this.renderCalendar()
  },
  destroyed() {
    document.removeEventListener('click', this.todayDisplay)
  },
  methods: {
    todayDisplay(e) {
      // 기존에 add 된 today today 클래스 제거
      // 또는 getElementByClass('.today') 해서 remove 해주는 게 성능에 더 좋을 듯 보입니다.
      if (e.target.closest('.day')) {
        let all = document.querySelectorAll('.day')
        for (let elem of all) {
          elem.classList.remove('today')
        }
        e.target.classList.add('today')
      }
    },
    prevClick() {
      this.date.setMonth(this.date.getMonth() - 1);
      this.renderCalendar()
    },
    nextClick() {
      this.date.setMonth(this.date.getMonth() + 1);
      this.renderCalendar()
    },
    renderMonthText() {
      this.monthText = this.months[this.date.getMonth()]
      this.fullDate = this.date.toDateString()
    },
    renderCalendar() {
      this.renderMonthText()
      
      this.lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate()
      this.prevLastDay = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate()

      let array = new Array(this.date.getDay()).fill(this.date.getDay())
      this.firstDayIndex = array.map((v, i) => v -= i)

      const lastDayIndex = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
      this.nextDays = 7 - lastDayIndex - 1;
    },
  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
/*중앙정렬 시작*/
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.container {
  width: 100%;
  height: 50vh;
  border-radius: 1em;
  background-color: rgb(33, 32, 32);
}
/*중앙정렬 끝*/
.calendar {
  width: 430px;
  height: 500px;
  background-color: white;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.669), -10px -10px 20px rgba(0, 0, 0, 0.436);
}
.calendar .month {
  width: 100%;
  height: 20%;
  padding: 20px 30px;
  background-color: #ff9a8b;
  background-image: linear-gradient(90deg, #ff9a8b 0%, #ff6a88 55%, #ff99ac 100%);
  justify-content: space-between; /* 쉐브론 양쪽 팔벌려서 두기 */
  text-align: center;
}
.calendar .month img {
  width: 10px;
  height: 10px;
  cursor: pointer;
  transition: 0.1s;
}
.calendar .month img:hover {
  opacity: 0.8;
}
.calendar .month h1 {
  /* CSS 로 문자열 조절 ! */
  text-transform: uppercase;
  font-size: 30px;
}
.calendar .month p {
  font-weight: 300;
  color: rgba(0, 0, 0, 0.797);
  font-family: "Avenir Next", sans-serif;
}
.weekdays {
  width: 100%;
  padding: 10px 10px 0 10px;
  height: 10%;
}
.weekdays div {
  /* 요일 요소 균등하게 7등분 */
  width: calc(430px / 7);
  height: 80%;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  margin: 0 5px;
  transition: 0.2s;
}
.days {
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  margin: auto;
  padding: 30px 10px;
  padding-top: 0;
}
.days div {
  width: calc(400px / 7);
  height: calc(400px / 7);
  text-align: center;
  font-size: 13px;
  font-family: "Avenir Next", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.1s;
}
.days .previous-days,
.days .next-days {
  /* 지난달과 다음달 일자는 흐리게*/
  color: rgba(0, 0, 0, 0.349)
}
.days .today {
  background-color: #ff6a88;
  cursor: pointer;
  color: white;
  border-radius: 50%;
  transition: 0.2s;
}
.days .today:hover {
  background-color: #f95c79;
}
/* 일자에 마우스를 올릴때, today 빼고 스타일링 적용 */
.days div:not(.today):hover {
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.215);
  cursor: pointer;
}

</style>

```

<Comment />

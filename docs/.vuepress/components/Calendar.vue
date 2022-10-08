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
          <div v-for="n in firstDayIndex" :key="n" class="previous-days day">
            {{ prevLastDay - n + 1 }}
          </div>
          <!-- 1일부터 마지막날까지 -->
            <template v-for="i in lastDay">
              <template v-if="i === new Date().getDate() && date.getMonth() === new Date().getMonth()">
                <div class="today day"> {{i}} </div>
              </template>
              <template v-else>
                <div class="day"> {{i}} </div>
              </template>
            </template>
          <!-- nextDays 가 5라면 n은 1부터 5까지 출력된다. 1부터 시작됩니다. -->
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
      firstDayIndex: 0,  // 이번달 첫날의 요일 ( 1이면 월욜, 6이면 토요일 이런식 )
      prevLastDay: 0,    // 지난달 마지막 일자
      lastDay : 0,       // 이번달 마지막일 자
      nextDays: 0,       // 다음달 N일
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

      // 이번 달 마지막 일자 구하기 31
      this.lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate()

      // 지난 달 마지막 일자 구하기 30
      this.prevLastDay = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate()

      // 오늘날짜의 요일! 6 (토욜), [6, 5, 4, 3, 2, 1]
      let array = new Array(this.date.getDay()).fill(this.date.getDay())
      this.firstDayIndex = array.map((v, i) => v -= i)

      // 이번달 마지막 날짜의 요일. 1은 수요일
      const lastDayIndex = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();

      // 다음달 루프돌 일수! 5
      // 월요일인 1이라면  7 - 1 - 1 = 5
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
  /* CSS 로 문자열 조절 ! 멋지네 */
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
  /* 여기가 컬럼이 되면 세로정렬이 된다.*/
  flex-wrap: wrap;
  /*flex 아이템이 flex 컨테이너 안에서 표시되도록, 줄 바꿈.*/
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
/* 일자에 마우스를 올릴때 단 today 빼고 스타일링 적용 */
.days div:not(.today):hover {
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.215);
  cursor: pointer;
}

</style>

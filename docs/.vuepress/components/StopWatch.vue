<template>
  <div class="body flex">
    <div class="container flex">
      <div class="stopwatch flex">
        <h1>STOP WATCH</h1>
        <div class="circle flex">
          <span class="time" id="display">{{ displayTime }}</span>
        </div>
      </div>
    </div>
    <div class="controls">
      <button class="buttonPlay" @click="start">
        <span id="playButton">▶️</span>
      </button>
      <button class="buttonPlay" @click="pause">
        <span id="pauseButton">⏸</span>
      </button>
      <button class="buttonReset" @click="reset">
        <span id="resetButton">🔁</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      elapsedTime: 0,
      timerInterval: '',
      playButton: null,
      pauseButton: null,
      resetButton: null,
      displayTime: '00:00:00'
    }
  },
  mounted() {
    this.playButton = document.getElementById('playButton')
    this.pauseButton = document.getElementById('pauseButton')
    this.resetButton = document.getElementById('resetButton')
  },
  methods: {
    timeToString(time) {

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
    },
    showButton( key ) {
      const buttonToShow = key === 'PLAY' ? this.playButton : this.pauseButton
      const buttonToHide = key === 'PLAY' ? this.pauseButton : this.playButton
      buttonToShow.style.display = 'block'
      buttonToHide.style.display = 'none'
    },
    start() {
      let startTime = Date.now() - this.elapsedTime
      let that = this
      this.timerInterval = setInterval(() => {
        this.elapsedTime = Date.now() - startTime
        this.displayTime = that.timeToString(this.elapsedTime)
      }, 10)
      this.showButton('PAUSE')
    },
    pause() {
      clearInterval(this.timerInterval)
      this.showButton('PLAY')
    },
    reset() {
      clearInterval(this.timerInterval)
      this.displayTime = '00:00:00'
      this.elapsedTime = 0
      this.showButton('PLAY')
    }
  }
}
</script>
<style scoped>
.body {
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
.controls button span {
  margin: 0 20px;
  cursor: pointer;
  font-size: 30px;
}
.controls {
  margin-top: 50px
}
#playButton {
  display: block;
}
#pauseButton {
  display: none;
}

@media only screen and (max-width: 600px) {
  body {
    margin-top: 50%;
  }
}

</style>

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
.pressed {
  background: rgba(0, 0, 0, 0.568);
  -webkit-box-shadow: inset 0 0 5px #e5e5e5;
  -moz-box-shadow: inset 0 0 0 5px #219123;
  box-shadow: inset 0 0 5px #ffffff;
  transform: scale(1.2);
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
